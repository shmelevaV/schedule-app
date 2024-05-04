const Router = require('express')
const router = new Router()
const departmentController = require('../controllers/departmentController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), departmentController.create)
router.get('/', departmentController.getAll)

module.exports = router