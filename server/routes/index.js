const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const departmentRouter = require('./departmentRouter')
const positionRouter = require('./positionRouter')
const auditoriumRouter = require('./auditoriumRouter')

router.use('/department', departmentRouter)
router.use('/user',userRouter)
router.use('/position',positionRouter)
router.use('/auditorium',auditoriumRouter)


module.exports = router