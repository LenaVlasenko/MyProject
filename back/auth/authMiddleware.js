
jwt = require('jsonwebtoken')


const authMiddleware = function (request, response, next){


    //получаю ключ из любой точки
    const token =
        request.body.token ||
        request.query.token ||
        request.headers["x-access-token"] ||
        request.headers.authorization;

    console.log("Проверяю ключ: " + token)

   // Если передали ключ проверю его
    if (token) {
        jwt.verify(
            token,
            process.env.JWT_KEY,
            (err, jwtUser) => {
                if (err) {
                    console.log("Ошибка расшифрофки")
                    console.log(err)
                    next()
                }//если есть ошибка просто пойду дальше
                console.log('Восстановленные данные')
                console.log(jwtUser)
                request.user = jwtUser // передаю всем кто пришел
            }
        )
    }
//пойти дальше
    next()

}

module.exports = authMiddleware;