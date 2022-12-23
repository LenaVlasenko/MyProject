// Подключиение модуля работы с базой
const mongoose = require("mongoose");


// Настройка полей (схемы)
const shopsSchema = new mongoose.Schema({
    author_id: {type: mongoose.ObjectId},//кто создал магазин
    avatar: String,// фото брэнда на аватаре
    email: String,
    typeProduct: Number, // 0 - одежа, 1 - меблі....
    typeShop: Number, // 0 - украинский производитель, 1 - підприемець
    shopName: String,// название магазина
    contact: Number, // номер телефона
    location: String,// адресс
    aboutShop: String,// иформация о магазине, условия заказа
    created_at: Date,// когда создал магазин
    telegram: String,//??



});

module.exports = mongoose.model("shop", shopsSchema);