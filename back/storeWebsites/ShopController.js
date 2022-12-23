const ShopModel = require('./ShopModel')

exports.create = async function (request, response){
    // Если пользователь не авторизован - нет ключа
    if (!request.user){
        return response.status(401).json({message: "Вы не вошли в систему"})
    }


    let bodyShop = request.body
    bodyShop.author_id = request.user._id // фиксируем пользователя
    bodyShop.created_at = Date.now()

    // TODO: потом тут получать картинки

    let newShop = new ShopModel (bodyShop)

    console.log(request.files)
    if (request.files) {
        let fileData = request.files.file
        let uploadFileDir = './public/store/files/' + fileData.name
        await fileData.mv(uploadFileDir) // переместить файл
        newShop.avatar = '/store/files/' + fileData.name
        console.log('file ready')
    }

    console.log(newShop)

    // if (request.user.email === bodyShop.email){
    //     return response.status(422).json({message: "У вас вже є магазин"})
    //     console.log(request.user.email)
    //     console.log(bodyShop.email)
    // }

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

    let findParams = {}

    // console.log(request.query.author_id)

    if(request.query.author_id !== undefined )
        findParams.author_id = request.query.author_id



    console.log("Search Params:")
    console.log(findParams)

    ShopModel.find(findParams, function(err, allShops){

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

    console.log("shop_ID: " + findId)

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