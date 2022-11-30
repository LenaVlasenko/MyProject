const {request} = require("express");

const modelUser = require('./models/User')
const userModel = require("./models/User");
const bcrypt = require("bcrypt");
let salt = process.env.BCRYPT_SALT

//получаем текущего пользователя
exports.getMe = function (request, response) {

    // Если пользователь не авторизован - нет ключа
    if (!request.user){
        return response.status(403).json({message: "Вы не вошли в систему"})
    }

    modelUser.findById(request.user._id, function (err, user){

        if (err){
            console.log(err);
            return response.status(404).json(err)
        }
        else {
            user['password'] = null
            //delete user['password']

            return response.status(200).json(user)
        }
    })

}

// сохранить мой профиль

exports.setMe = function (request, response){
    console.log("Обновляю пользователя")
    console.log(request.user)

    console.log("На что я его собираюсь обновить")
    let updateUser = request.body
    console.log(updateUser)

    // 1Нужно проверить - а соответсвует пользователь паролю
    //если не соответствует, нужно вернуть ошибку и дальше не двигаться

    //Шлю введеный профиль
    bcrypt.hash(updateUser.password, salt, function (err, result) {
        if (err) {
            console.log(err)
            return response.status(422).json(err)
        }
        updateUser.password = result

        // Проверяю - а соотвествует ли введеный пароль
        userModel.findOne({_id: request.user._id, password: updateUser.password},
            async function (err, dbUser){
                // Если ошибка - вернуть ошибку
                if (err) {
                    console.log(err)
                    return response.status(422).json(err)
                }
                // Если в базе не найдено вернуть 403
                if(dbUser=== null) {
                    return response.status(403).json('{"err":"Auth"}')
                }

                console.log("А где пользовательский аватар")
                if (request.files) {
                    //2сохранить в папку где лежат аватары
                    let avatarFile = request.files.avatar
                    let avatarDir = './public/store/avatars/' + request.user._id + '.jpg'//+ avatarFile.name
                    await avatarFile.mv(avatarDir) // переместить файл
                    updateUser.avatar = '/store/avatars/' + request.user._id + '.jpg'//+ avatarFile.name
                }

                //3 обновить данные в базе данных
                updateUser.role = request.user.role // роль оставить старую, пользователь не может ее себе менять
                updateUser.email = request.user.email

                //4 обновляю запись в базе данных
                userModel.findByIdAndUpdate(request.user._id, updateUser, function (err, newUser) {
                    if(err){
                        console.log(err);
                        return response.status(422).json(err);
                    }
                    else{
                        // Если все шаги ок отправляю код 204, данные обновлены
                        console.log('Update Ok')
                        return response.sendStatus(204);
                    }
                })

            })
    })

}