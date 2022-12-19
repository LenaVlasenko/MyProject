const ShopModel = require('./ShopModel')

exports.create = function (request, response){
    // Если пользователь не авторизован - нет ключа
    if (!request.user){
        return response.status(401).json({message: "Вы не вошли в систему"})
    }

    let bodyShop = request.body
    bodyShop.author_id = request.user._id // фиксируем пользователя
    bodyShop.created_at = Date.now()

    // TODO: потом тут получать картинки

    let newShop = new ShopModel (bodyShop)

    console.log(newShop)

    // Сохранили запись в базе данных
    newShop.save(function(err){
        if(err) { // Если ошибка - вернуть ошибку
            console.log(err)
            return response.status(422).json(err)
        }
        else { // Если все хорошо - вренуть новое
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

// вернуть конкрекретный магазин
exports.show = function (request, response) {

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

//Змінити
exports.update = function (request, response){
    // Если пользователь не авторизован - нет ключа
    if (!request.user){
        return response.status(401).json({message: "Вы не вошли в систему"})
    }

    //Шукаю запис в базі данних
    ShopModel.findById(findId, function(err, shop){

        if(err) {
            console.log(err);
            return response.status(404).json(err);
        }
        else {
            if (shop.author_id.toString() !== request.user._id){
                return response.status(403).json({message: "Ви не маєте права видалити цей магазин"})
            }

            // ShopModel.updateOne(findId, function (err){
            //     if(err) {
            //         console.log(err);
            //         return response.status(422).json(err);
            //     }
            //
            //     return response.status(204).send("Success!")
            //
            // })

            return response.status(204).send("Success!")

        }
    });


}

//Видалити магазин
exports.delete = function (request, response){
    // Если пользователь не авторизован - нет ключа
    if (!request.user){
        return response.status(401).json({message: "Вы не вошли в систему"})
    }

    let findId = request.params.shop_id

    //Шукаю запис в базі данних
    ShopModel.findById(findId, function(err, shop){

        if(err) {
            console.log(err);
            return response.status(404).json(err);
        }
        else {
            if (shop.author_id.toString() !== request.user._id){
                return response.status(403).json({message: "Ви не маєте права видалити цей магазин"})
            }

            ShopModel.findByIdAndDelete(findId, function (err){
                if(err) {
                    console.log(err);
                    return response.status(422).json(err);
                }

                return response.status(204).send("Success!")

            })
        }
    });

    //Знайти те що треба видалити
    //Поривняти автора і того, хто хоче видалити. Видаляти тільки тоді коли автор співпадає


}