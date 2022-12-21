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
exports.index = async function (request, response) {

    console.log("Пришел за всеми объявлениями")


    //Данные для постраничного вывода

    // количество обьявлений на странице
    let per_page = 3;
    if (request.query.per_page !== undefined) per_page = request.query.per_page


    // Текущая страница
    let page = 1;
    if (request.query.page !== undefined) page = request.query.page


    console.log("Элементов на странице" + per_page)
    console.log("Текущая страница" + page)

    let total = await adModel.count();
    let allAds = await adModel.find({}).sort('created_at').skip((per_page*(page - 1))).limit(per_page);
    let send = {
        total: total,// Сколько всего в колекции
        page: page,// Какая сейчас страница открыта
        per_page: per_page,// Сколько элементов на страницу
        data: allAds// Сами элементы данной страницы
    }

    console.log(send)
    return response.status(200).json(send);


    // let findParamsAd = {}
    //
    // console.log(request.query.author_id)
    //
    // if(request.query.author_id !== undefined )
    //     findParamsAd.author_id = request.query.author_id
    //
    // console.log("Search Params:")
    // console.log(findParamsAd)
    //
    // adModel.find(findParamsAd, function(err, allAd){
    //
    //     if(err) {
    //         console.log(err);
    //         return response.status(404).json(err);
    //     }
    //     else {
    //         return response.status(200).json(allAd);
    //     }
    // });
}

// вернуть конкрекретный магазин
exports.show = function (request, response) {

    let findId = request.params.ads_id

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







