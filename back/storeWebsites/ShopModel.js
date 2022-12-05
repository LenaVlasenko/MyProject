// Подключиение модуля работы с базой
const mongoose = require("mongoose");


// Настройка полей (схемы)
const shopsSchema = new mongoose.Schema({
    author_id: {type: mongoose.ObjectId},//кто создал магазин
    avatar: String,// фото брэнда на аватаре
    created_at: Date,// когда создал магазин
    type: Number, // 0 - украинский производитель, 1 - предпринематель
    title: String, // заголовок
    message: String, // текст в обьявлении
    price: Number, //цена
    city: String,// город
    location: String,// адресс
    contact: Number, // номер телефона
    imgMain: String,//ссылка на главное изображение
    images: {String},// набор картинок
    isOpen: Boolean, // актуально не актуально
    category: Number, // 0 - одежда, 1 - мебель, 2 - ...

    comments: String, //коментарии
});

module.exports = mongoose.model("shop", shopsSchema);