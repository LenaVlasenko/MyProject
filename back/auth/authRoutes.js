//методы для прокладки дороги
let express = require('express');
let router = express.Router();

//ссылка на того - к кому прокладываем дорогу
let authController = require("./AuthController")
let userController = require("./UserController")


//правила как отвечать тому кто пришел
router.post("/register", authController.register)
router.post("/login", authController.login)

router.get('/getMe', userController.getMe)
router.post('/setMe', userController.setMe)


//подготовится к подключению к общей сети дорог
module.exports = router;