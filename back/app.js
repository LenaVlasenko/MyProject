//чтение файла из .env
require('dotenv').config();

//сам веб сервер
let express = require('express');
let app = express();

//для технических сообщений
let logger = require('morgan');
app.use(logger('dev'));

//для разрешения получения запросов с любого сайта
let cors = require('cors')
app.use(cors())

//для работы с JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Для работы с файлами
let fileupload = require ("express-fileupload");
app.use(
    fileupload({
        createParentPath: true,
    }),
);

//для работы с кукакми
let cookieParser = require('cookie-parser');
app.use(cookieParser());

//для статических файлов
let path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Для работы с базой данных
require("./config/mongo").connect();

// Проверять всех входящих на ключ
const authMiddleware = require('./auth/authMiddleware')
app.use(authMiddleware)

//маршрутизация
const auth = require('./auth/authRoutes')
app.use('/api/auth', auth)




//подготовка модуля к работе
module.exports = app;
