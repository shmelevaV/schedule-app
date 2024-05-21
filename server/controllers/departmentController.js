const {DepartmentList} = require('../models/models')
const ApiError = require('../error/ApiError')

class DepartmentController{
    async create(req,res){
        const {name} = req.body
        const department = await DepartmentList.create({name})
        return res.json(department)
    }
    async getAll(req,res){
        const departments = await DepartmentList.findAll()
        return res.json(departments)
    }

    async delete(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "ID заявки является обязательным параметром"});
        }

        const request = await DepartmentList.findOne({ where: { id } });

        if (!request) {
            return res.status(404).json({message: "Заявка не найдена"});
        }

        await request.destroy();

        return res.json({message: "Заявка успешно удалена"});
    }

}

module.exports = new DepartmentController()