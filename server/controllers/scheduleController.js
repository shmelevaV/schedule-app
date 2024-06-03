const {ClassSchedule,AuditoriumList, DisciplineList, TeacherList, GroupList} = require('../models/models')

class scheduleController{
    //метод добавления объекта в бд
    async create(req,res){
         const {number,firstDate,period,lastDate,teacherListId,disciplineListId,groupListId,auditoriumListId} = req.body
         const request = await ClassSchedule.create({number,firstDate,period,lastDate,teacherListId,disciplineListId,groupListId,auditoriumListId})
        return res.json(request)
    }
    //метод получения объектов из бд
    async getAll(req, res) {
        const schedule = await ClassSchedule.findAll({
            //присоединяем необходимые поля
            include: 
            [{
                model: AuditoriumList,
                attributes: ['number'], 
            },
            {
                model: DisciplineList,
                attributes: ['short_name'], 
            },
            {
                model: TeacherList,
                attributes: ['surname_N_P'], 
            },
            {
                model: GroupList,
                attributes: ['name'], 
            }]
        });
   
    return res.json(schedule);
    }

    async delete(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "ID заявки является обязательным параметром"});
        }

        const request = await ClassSchedule.findOne({ where: { id } });

        if (!request) {
            return res.status(404).json({message: "Заявка не найдена"});
        }

        await request.destroy();

        return res.json({message: "Заявка успешно удалена"});
    }
}

module.exports = new scheduleController()