const Router = require('express')
const router = new Router()
const requestController = require('../controllers/requestController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', requestController.create)
router.get('/', requestController.getAll)

module.exports = router