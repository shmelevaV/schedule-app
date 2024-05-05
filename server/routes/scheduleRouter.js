const Router = require('express')
const router = new Router()
const scheduleController = require('../controllers/scheduleController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', scheduleController.create)
router.get('/', scheduleController.getAll)

module.exports = router