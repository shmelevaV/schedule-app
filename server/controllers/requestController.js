const {RequestList, AuditoriumList, DisciplineList, TeacherList, GroupList} = require('../models/models')
const ApiError = require('../error/ApiError')

class RequestController{
    async create(req,res){
        const {number,submissionDate,firstDate,period,lastDate,
            status,teacherListId,disciplineListId,groupListId,auditoriumListId} = req.body

        console.log("number= ",number)
        
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
            }
    ]
        });
   

return res.json(schedule);

    }

}

module.exports = new RequestController()