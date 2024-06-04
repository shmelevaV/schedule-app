const {GroupList} = require('../models/models')
class GroupController{
    // Метод создания новой группы
    async create(req,res){
        const {name} = req.body
        const group = await GroupList.create({name})
        return res.json(group)
    }
     // Метод получения всех групп
    async getAll(req,res){
        const groups = await GroupList.findAll()
        return res.json(groups)
    }
    // Метод удаления группы по id
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