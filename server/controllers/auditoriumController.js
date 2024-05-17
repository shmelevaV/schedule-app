const {AuditoriumList, TypeList} = require('../models/models')
const ApiError = require('../error/ApiError')

class AuditoriumController{
    async create(req,res){
        const {number,capacity,typeListId} = req.body
        const type = await AuditoriumList.create({number,capacity,typeListId})
        return res.json(type)
    }
    async getAll(req,res){
        const auds = await AuditoriumList.findAll()
        return res.json(auds)
    }
    async getAllJoined(req,res){
        const auds = await AuditoriumList.findAll({

            include: [{
                model: TypeList,
                attributes: ['name'], 
            },
            ]
        });
        return res.json(auds)
    }
    async getOne(req,res){
        const{id}=req.params
    }
}

module.exports = new AuditoriumController()