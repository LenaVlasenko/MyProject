const ShopModel = require('./ShopModel')

exports.create = function (request, response){
    // Если пользователь не авторизован - нет ключа
    if (!request.user){
        return response.status(403).json({message: "Вы не вошли в систему"})
    }

    let bodyShop = request.body
    bodyShop.author_id = request.user._id // фиксируем пользователя
    bodyShop.created_at = Date.now()

    // TODO: потом тут получать картинки

    let newShop = new ShopModel (bodyShop)

    // Сохранили запись в базе данных
    newShop.save(function(err){
        if(err) { // Если ошибка - вернуть ошибку
            console.log(err)
            return response.status(422).json(err)
        }
        else { // Если все хорошо - вренуть нового студента
            return response.status(201).json(newShop);
        }
    });

}

//вернуть все
exports.index = function (request, response) {
    ShopModel.find({}, function(err, allShops){

        if(err) {
            console.log(err);
            return response.status(404).json(err);
        }
        else {
            return response.status(200).json(allShops);
        }
    });
}

// вернуть конкрекретное обьявление
exports.show = function (request, response) { //получили всех студентов и отправили со статусом 201

    let findId = request.params.shop_id

    ShopModel.findById(findId, function(err, allShops){

        if(err) {
            console.log(err);
            return response.status(404).json(err);
        }
        else {
            return response.status(200).json(allShops);
        }
    });
}