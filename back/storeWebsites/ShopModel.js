// Подключиение модуля работы с базой
const mongoose = require("mongoose");


// Настройка полей (схемы)
const shopsSchema = new mongoose.Schema({
    author_id: {type: mongoose.ObjectId},//кто создал магазин
    avatar: String,// фото брэнда на аватаре
    shopName: String,// название магазина
    contact: Number, // номер телефона
    aboutShop: String,// иформация о магазине, условия заказа
    created_at: Date,// когда создал магазин
    typeShop: Number, // 0 - украинский производитель, 1 - предпринематель
    typeProducts: Number,// категория товара 0 - одежда, 1 - мебель ...
    imgMain: String,//ссылка на главное изображение
    images: {String},// набор картинок
    title: String, // заголовок
    message: String, // текст в обьявлении
    price: Number, //цена
    city: String,// город
    location: String,// адресс

    isOpen: Boolean, // актуально не актуально
    category: Number, // 0 - одежда, 1 - мебель, 2 - ...

    comments: String, //коментарии
});

module.exports = mongoose.model("shop", shopsSchema);