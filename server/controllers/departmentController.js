const {DepartmentList} = require('../models/models')
const ApiError = require('../error/ApiError')

class DepartmentController{
    async create(req,res){
        const {name} = req.body
        const department = await DepartmentList.create({name})
        return res.json(department)
    }
    async getAll(req,res){
        const departments = await DepartmentList.findAll()
        return res.json(departments)
    }

}

module.exports = new DepartmentController()