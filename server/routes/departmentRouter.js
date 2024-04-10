const Router = require('express')
const router = new Router()
const departmentController = require('../controllers/departmentController')

router.post('/', departmentController.create)
router.get('/', departmentController.getAll)

module.exports = router