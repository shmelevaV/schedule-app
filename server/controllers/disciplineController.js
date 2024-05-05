const { DisciplineList} = require('../models/models')
const ApiError = require('../error/ApiError')

class  DisciplineController{
    async create(req,res){
        const {name,short_name} = req.body
        const discipline = await  DisciplineList.create({name,short_name})
        return res.json(discipline)
    }
    async getAll(req,res){
        const disciplines = await  DisciplineList.findAll()
        return res.json(disciplines)
    }
}

module.exports = new  DisciplineController()