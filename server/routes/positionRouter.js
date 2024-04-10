const Router = require('express')
const router = new Router()
const positionController = require('../controllers/positionController')

router.post('/', positionController.create)
router.get('/', positionController.getAll)

module.exports = router