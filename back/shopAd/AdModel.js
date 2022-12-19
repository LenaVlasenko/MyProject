// Подключиение модуля работы с базой
const mongoose = require("mongoose");

// Настройка полей (схемы)
const adSchema = new mongoose.Schema({
   // _id - сделает база данных
    author_id: {type: mongoose.ObjectId}, // ??String
    created_at: Date, // когда создал
    img: String,//ссылка на главное изображение
    title: String, // заголовок
    message: String, // текст в обьявлении
    price: Number, //цена

    isOpen: Boolean, // актуально не актуально
    category: Number, // 0 - одежда, 1 - мебель, 2 - ...

    comments: String, //коментарии
    like: String,//???

});

module.exports = mongoose.model("ads", adSchema)