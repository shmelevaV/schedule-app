const Router = require('express')
const router = new Router()
const teacherController = require('../controllers/teacherController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', teacherController.create)
router.get('/', teacherController.getAll)

module.exports = router