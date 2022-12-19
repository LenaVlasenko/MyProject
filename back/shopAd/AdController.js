const adModel = require('./AdModel')


exports.create = function (request, response){
    // Если пользователь не авторизован - нет ключа
    if (!request.user){
        return response.status(401).json({message: "Вы не вошли в систему"})
    }

    let bodyAd = request.body
    bodyAd.author_id = request.user._id // фиксируем пользователя
    bodyAd.created_at = Date.now()

    // TODO: потом тут получать картинки

    let newAd = new adModel (bodyAd)

    console.log(newAd)

    // Сохранили запись в базе данных
    newAd.save(function(err){
        if(err) { // Если ошибка - вернуть ошибку
            console.log(err)
            return response.status(422).json(err)
        }
        else { // Если все хорошо - вренуть новое
            return response.status(201).json(newAd);
        }
    });

}

//вернуть все
exports.index = function (request, response) {
    adModel.find({}, function(err, allAd){

        if(err) {
            console.log(err);
            return response.status(404).json(err);
        }
        else {
            return response.status(200).json(allAd);
        }
    });
}

// вернуть конкрекретный магазин
exports.show = function (request, response) {

    let findId = request.params.ad_id
    adModel.findById(findId, function(err, allAd){

        if(err) {
            console.log(err);
            return response.status(404).json(err);
        }
        else {
            return response.status(200).json(allAd);
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
    adModel.findById(findId, function(err, ad){

        if(err) {
            console.log(err);
            return response.status(404).json(err);
        }
        else {
            if (ad.author_id.toString() !== request.user._id){
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

    let findId = request.params.ad_id

    //Шукаю запис в базі данних
    adModel.findById(findId, function(err, ad){

        if(err) {
            console.log(err);
            return response.status(404).json(err);
        }
        else {
            if (ad.author_id.toString() !== request.user._id){
                return response.status(403).json({message: "Ви не маєте права видалити цей магазин"})
            }

            adModel.findByIdAndDelete(findId, function (err){
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







