const {TypeList} = require('../models/models')
const sequelize = require('../db') 
class TypeController{
    // Метод добавления нового типа
    async create(req,res){
        const maxIdResult = await sequelize.query("SELECT MAX(id) FROM type_lists");
        const maxId = maxIdResult[0][0].max;
        await sequelize.query(`ALTER SEQUENCE type_lists_id_seq RESTART WITH ${maxId + 1}`);
        const {name} = req.body
        const type = await TypeList.create({name})
        return res.json(type)
    }
    // Метод получения всех типов
    async getAll(req,res){
        const types = await TypeList.findAll()
        return res.json(types)
    }
    // Метод удаления типа по id
    async delete(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "ID является обязательным параметром"});
        }
        const request = await TypeList.findOne({ where: { id } });
        if (!request) {
            return res.status(404).json({message: "Объект не найден"});
        }
        await request.destroy();
        return res.json({message: "Удаление прошло успешно"});
    }
}
module.exports = new TypeController()
