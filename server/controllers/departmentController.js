const {DepartmentList} = require('../models/models')
const sequelize = require('../db') 
// Определяем класс DepartmentController
class DepartmentController{
    // Метод для создания новой кафедры
    async create(req,res){
        const maxIdResult = await sequelize.query("SELECT MAX(id) FROM department_lists");
        const maxId = maxIdResult[0][0].max;
        await sequelize.query(`ALTER SEQUENCE department_lists_id_seq RESTART WITH ${maxId + 1}`);
        const {name} = req.body
        const department = await DepartmentList.create({name})
        return res.json(department)
    }
    // Метод для получения всех кафедр
    async getAll(req,res){
        const departments = await DepartmentList.findAll()
        return res.json(departments)
    }
    // Метод для удаления кафедры по id
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
