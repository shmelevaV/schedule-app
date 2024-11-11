const { PositionList} = require('../models/models')
const sequelize = require('../db') 
class PositionController{
    // Метод создания новой должности
    async create(req,res){
        const maxIdResult = await sequelize.query("SELECT MAX(id) FROM position_lists");
        const maxId = maxIdResult[0][0].max;
        await sequelize.query(`ALTER SEQUENCE position_lists_id_seq RESTART WITH ${maxId + 1}`);
        const {name,short_name} = req.body
        const position = await PositionList.create({name,short_name})
        return res.json(position)
    }
    // Метод получения всех должностей
    async getAll(req,res){
        const positions = await PositionList.findAll()
        return res.json(positions)
    }
    // Метод удаления должности по id
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