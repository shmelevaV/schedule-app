const Router = require('express')
const router = new Router()
const auditoriumController = require('../controllers/auditoriumController')

router.post('/', auditoriumController.create)
router.get('/', auditoriumController.getAll)

module.exports = router