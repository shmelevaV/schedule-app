const Router = require('express')
const router = new Router()
const auditoriumController = require('../controllers/auditoriumController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', auditoriumController.create)
router.get('/', auditoriumController.getAll)

module.exports = router