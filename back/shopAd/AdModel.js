// Подключиение модуля работы с базой
const mongoose = require("mongoose");

// Настройка полей (схемы)
const adSchema = new mongoose.Schema({
   // _id - сделает база данных
    author_id: {type: mongoose.ObjectId}, // ??String
    created_at: Date, // когда создал
    imgCard: String,//ссылка на главное изображение
    title: String, // заголовок
    message: String, // текст в обьявлении
    price: Number, //цена


    comments: String, //коментарии
    like: String,//???

});

module.exports = mongoose.model("ads", adSchema)