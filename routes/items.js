const router = require('express').Router()
const { validate } = require('express-validation')

const itemsController = require('../controllers/items')
const { ItemDetails } = require('../validation/item.validation')

router.get('/items', itemsController.getAllItems)
router.get('/items/:id', itemsController.getItemsById)
router.post('/items',  validate(ItemDetails), itemsController.addItems)
router.put('/items/:id',  validate(ItemDetails), itemsController.updateItems)
router.delete('/items/:id', itemsController.deleteItems)

module.exports = router