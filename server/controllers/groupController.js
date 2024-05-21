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

    async delete(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "ID заявки является обязательным параметром"});
        }

        const request = await GroupList.findOne({ where: { id } });

        if (!request) {
            return res.status(404).json({message: "Заявка не найдена"});
        }

        await request.destroy();

        return res.json({message: "Заявка успешно удалена"});
    }
}

module.exports = new GroupController()