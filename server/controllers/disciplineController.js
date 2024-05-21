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
    async delete(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "ID заявки является обязательным параметром"});
        }

        const request = await DisciplineList.findOne({ where: { id } });

        if (!request) {
            return res.status(404).json({message: "Заявка не найдена"});
        }

        await request.destroy();

        return res.json({message: "Заявка успешно удалена"});
    }
}

module.exports = new  DisciplineController()