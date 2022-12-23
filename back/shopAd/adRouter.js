let express = require('express');
let router = express.Router();

let adController = require('./AdController')

router.post('/', adController.create)

router.get('/', adController.index)
router.get('/:ad_id', adController.show)

router.put('/:ad_id', adController.update)
router.delete('/:ad_id', adController.delete)

// router.post('/like/:ad_id', adController.like)



module.exports = router;