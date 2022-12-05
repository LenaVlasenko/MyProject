//методы для прокладки дороги
let express = require('express');
let router = express.Router();

let ShopController = require ('./ShopController')

router.get('/', ShopController.index)
router.get('/:shop_id', ShopController.show)

router.post('/', ShopController.create)

module.exports = router