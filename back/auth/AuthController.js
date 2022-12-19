jwt = require('jsonwebtoken')
const generateUUID = require('./guid')
const nodemailer = require("nodemailer")

const userModel = require('./models/User')
const verifyModel = require('./models/EmailConfirmation')


let bcrypt = require('bcrypt')
let salt = process.env.BCRYPT_SALT


/**
 * Авторизация
 */
exports.login = function (request, response) {
    //console.log(salt)
    let user = request.body
    bcrypt.hash(user.password, salt, function (err, result) {
        if (err) {
            console.log(err)
            return response.status(422).json(err)
        }
        user.password = result
        console.log(result)

        userModel.findOne({email: user.email, password: user.password},
            function (err, dbUser) {
                // Если ошибка - вернуть ошибку
                if (err) {
                    console.log(err)
                    return response.status(422).json(err)
                }
                // Если в базе не найдено вернуть 403
                if(dbUser=== null) {
                    return response.status(403).json('{"err":"Auth"}')
                }
                // console.log('Find')
                // console.log(dbUser)

                //Всегда удалять не нужную информацию
                dbUser['password'] = null
                delete dbUser["password"]
                console.log(dbUser)

                //Или формируйте ответ по условиям задачи
                let sendUser = {
                    _id:dbUser._id,
                    email: dbUser.email,
                    role: dbUser.role
                }


                let jwtUser = {
                    user: sendUser, // Посылать данные - ну можно имя например
                    token: jwt.sign(
                        {
                            _id: dbUser._id,
                            email: dbUser.email,
                            role: dbUser.role
                        }, // Что я шифрую
                        process.env.JWT_KEY) // Ключ шифра
                }
                return response.status(200).json(jwtUser)
            })
    })


}


/**
 * Регистрация нового пользователя
 */
exports.register = function (request, response) {
    let user = request.body
    user.role = "user" // говорю о том что это простой клиент
    user.created_at = Date.now() // Когда пользователь зарегистрировался
    user.verify_at = null // Когда он подтвердил свою почту
    //console.log(user)
    bcrypt.hash(user.password, salt, function (err, result) {

        if (err) {
            console.log(err)
            return response.status(422).json(err.message)
        }
        user.password = result


        const newUser = new userModel(user)

        newUser.save( async function (err) {
            if (err) { // Если ошибка - вернуть ошибку
                console.log(err.toString())
                return response.status(403).json(err.toString())
            }
            // Отправить письмо пользователю
            // с сформированной ссылкой
            await sendVerityEmail(newUser)
            newUser.password = null
            return response.status(201).json(newUser)
        })
    })
}


async function sendVerityEmail (user){
    //verifyModel

    verifyModel.findOne({email: user.email},
        async function (err, dbVerify) {
            // Если ошибка - вернуть ошибку
            if (err) {
                console.log(err)
                return err
            }
            // Если в базе не найдено вернуть 403
            if(dbVerify === null) {
                dbVerify = new verifyModel()
                dbVerify.email = user.email
                dbVerify.key = generateUUID.generateUUID()
                dbVerify.save()
            }

            console.log(dbVerify)

            let transporter = nodemailer.createTransport({
                pool: true,
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: true, // use TLS
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                },
            });

            let link = "http://localhost:3000/auth/verifyEmail/" + dbVerify.key

            let toUser = await transporter.sendMail({
                from: process.env.MAIL_FROM_ADDRESS, // sender address
                to: user.email, // list of receivers
                subject: "Подтвердите ваш электронный адрес", // Subject line
                text: link, // plain text body
                html: "<a href='"+ link + "' target='_blank'> Verify </a>", // html body
            });

            dbVerify.sendToUser = toUser.messageId

            dbVerify.save(function (err) {
                if (err) { // Если ошибка - вернуть ошибку
                    console.log(err)
                    return err
                }
                return "Ok"
            })

        })

}
