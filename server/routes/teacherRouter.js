const Router = require('express')
const router = new Router()
const teacherController = require('../controllers/teacherController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', teacherController.create)
router.get('/', teacherController.getAll)
router.get('/joined', teacherController.getAllJoined)
router.delete('/:id',  teacherController.delete);

module.exports = router