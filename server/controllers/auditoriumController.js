const {AuditoriumList, TypeList} = require('../models/models')
const sequelize = require('../db') 
// Определяем класс AuditoriumController
class AuditoriumController{
    // Метод для создания новой аудитории
    async create(req,res){
        const maxIdResult = await sequelize.query("SELECT MAX(id) FROM auditorium_lists");
        const maxId = maxIdResult[0][0].max;
        await sequelize.query(`ALTER SEQUENCE auditorium_lists_id_seq RESTART WITH ${maxId + 1}`);
        const {number,capacity,typeListId} = req.body
        const type = await AuditoriumList.create({number,capacity,typeListId})
        return res.json(type)
    }
    // Метод для получения всех аудиторий
    async getAll(req,res){
        const auds = await AuditoriumList.findAll()
        return res.json(auds)
    }
    // Метод для получения всех аудиторий с присоединенными типами
    async getAllJoined(req,res){
        const auds = await AuditoriumList.findAll({
            include: [{
                model: TypeList,
                attributes: ['name'], 
            }]
        });
        return res.json(auds)
    }
    // Метод для получения одной аудитории по id
    async getOne(req,res){
        const{id}=req.params
    }
    
    // Метод для удаления аудитории по id
    async delete(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "ID является обязательным параметром"});
        }
        const request = await AuditoriumList.findOne({ where: { id } });
        if (!request) {
            return res.status(404).json({message: "Аудитория не найдена"});
        }
        await request.destroy();
        return res.json({message: "Удаление прошло успешно"});
    }
}
module.exports = new AuditoriumController()
