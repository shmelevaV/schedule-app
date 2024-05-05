const { PositionList} = require('../models/models')
const ApiError = require('../error/ApiError')

class PositionController{
    async create(req,res){
        const {name,short_name} = req.body
        const position = await PositionList.create({name,short_name})
        return res.json(position)
    }
    async getAll(req,res){
        const positions = await PositionList.findAll()
        return res.json(positions)
    }
}

module.exports = new PositionController()