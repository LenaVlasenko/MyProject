//методы для прокладки дороги
let express = require('express');
let router = express.Router();

let ShopController = require ('./ShopController')

router.post('/', ShopController.create)

router.get('/', ShopController.index)
router.get('/:shop_id', ShopController.show)

// router.put('/:shop_id', ShopController.update)
router.delete('/:shop_id', ShopController.delete)


module.exports = router