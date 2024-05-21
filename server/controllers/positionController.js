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

    async delete(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "ID заявки является обязательным параметром"});
        }

        const request = await PositionList.findOne({ where: { id } });

        if (!request) {
            return res.status(404).json({message: "Заявка не найдена"});
        }

        await request.destroy();

        return res.json({message: "Заявка успешно удалена"});
    }

}

module.exports = new PositionController()