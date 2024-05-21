const Router = require('express')
const router = new Router()
const departmentController = require('../controllers/departmentController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', departmentController.create)
router.get('/', departmentController.getAll)
router.delete('/:id',  departmentController.delete);

module.exports = router