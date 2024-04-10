const {AuditoriumList} = require('../models/models')
const ApiError = require('../error/ApiError')

class AuditoriumController{
    async create(req,res){
        const {name, capacity, type} = req.body
        const Auditorium = await AuditoriumList.create({name, capacity, type})// ne robit
        return res.json(Auditorium)
    }
    async getAll(req,res){
        const Auditoriums = await AuditoriumList.findAll()
        return res.json(Auditoriums)
    }

}

module.exports = new AuditoriumController()