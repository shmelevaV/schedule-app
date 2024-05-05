const { TeacherList} = require('../models/models')
const ApiError = require('../error/ApiError')

class TeacherController{
    async create(req,res){
        const {surname_N_P,positionListId,departmentListId} = req.body
        const teacher = await TeacherList.create({surname_N_P,positionListId,departmentListId})
        return res.json(teacher)
    }
    async getAll(req,res){
        const teachers = await TeacherList.findAll()
        return res.json(teachers)
    }
}

module.exports = new TeacherController()