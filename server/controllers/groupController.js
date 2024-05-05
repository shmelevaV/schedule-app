const {GroupList} = require('../models/models')
const ApiError = require('../error/ApiError')

class GroupController{
    async create(req,res){
        const {name} = req.body
        const group = await GroupList.create({name})
        return res.json(group)
    }
    async getAll(req,res){
        const groups = await GroupList.findAll()
        return res.json(groups)
    }

}

module.exports = new GroupController()