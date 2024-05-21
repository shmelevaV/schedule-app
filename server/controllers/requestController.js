const {RequestList, AuditoriumList, DisciplineList, TeacherList, GroupList} = require('../models/models')
const ApiError = require('../error/ApiError')

class RequestController{
    async create(req,res){
        const {number,submissionDate,firstDate,period,lastDate,
            status,teacherListId,disciplineListId,groupListId,auditoriumListId} = req.body
        
        const request = await RequestList.create({number,submissionDate,firstDate,period,lastDate,
            status,teacherListId,disciplineListId,groupListId,auditoriumListId})
        return res.json(request)
    }

    async getAll(req, res) {

        const schedule = await RequestList.findAll({

            include: [{
                model: AuditoriumList,
                attributes: ['number'], // указываем, что хотим включить только поле 'number'
            },
            {
                model: DisciplineList,
                attributes: ['short_name'], // указываем, что хотим включить только поле 'name'
            },
            {
                model: TeacherList,
                attributes: ['surname_N_P'], // указываем, что хотим включить только поле 'name'
            },
            {
                model: GroupList,
                attributes: ['name'], // указываем, что хотим включить только поле 'name'
            }]});

    return res.json(schedule);
    }

    async updateStatus(req, res) {
        const { id, status } = req.body;
        console.log("st - ", status)
        if (!id || !status) {
            return res.status(400).json({message: "ID заявки и статус являются обязательными параметрами"});
        }

        const request = await RequestList.findOne({ where: { id } });

        if (!request) {
            return res.status(404).json({message: "Заявка не найдена"});
        }

        request.status = status;
        await request.save();

        return res.json(request);
    }

    async delete(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "ID заявки является обязательным параметром"});
        }

        const request = await RequestList.findOne({ where: { id } });

        if (!request) {
            return res.status(404).json({message: "Заявка не найдена"});
        }

        await request.destroy();

        return res.json({message: "Заявка успешно удалена"});
    }

}

module.exports = new RequestController()