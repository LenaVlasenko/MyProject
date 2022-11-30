// Подключиение модуля работы с базой
const mongoose = require("mongoose");


// Настройка полей (схемы)
const contactsSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    key: { type: String, unique: true},
    sendToUser: String,

    //относится к профилю пользователя
    //name: String,
    // phone: String,
    // message: String,
    // created_at: Date,
    // sendToMe: String,
    // sendToUser: String,
});

module.exports = mongoose.model("emailConfirmation", contactsSchema);