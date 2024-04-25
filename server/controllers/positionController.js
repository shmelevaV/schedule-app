const {PositionListList, PositionList} = require('../models/models')
const ApiError = require('../error/ApiError')

class PositionController{
    async create(req,res){
        const {name} = req.body
        const position = await PositionList.create({name})
        return res.json(position)
    }
    //викин комментарий!
    async getAll(req,res){
        const positions = await PositionList.findAll()
        return res.json(positions)
    }
}

module.exports = new PositionController()