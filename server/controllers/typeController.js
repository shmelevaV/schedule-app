const {TypeList} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController{
    async create(req,res){
        const {name} = req.body
        const type = await TypeList.create({name})
        return res.json(type)
    }
    async getAll(req,res){
        const types = await TypeList.findAll()
        return res.json(types)
    }
    async delete(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "ID заявки является обязательным параметром"});
        }

        const request = await TypeList.findOne({ where: { id } });

        if (!request) {
            return res.status(404).json({message: "Заявка не найдена"});
        }

        await request.destroy();

        return res.json({message: "Заявка успешно удалена"});
    }
}

module.exports = new TypeController()