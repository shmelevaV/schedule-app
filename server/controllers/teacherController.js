const { TeacherList, DepartmentList, PositionList} = require('../models/models')
const ApiError = require('../error/ApiError')

class TeacherController{
    async create(req,res){
        const {surname_N_P,positionListId,departmentListId} = req.body
        const teacher = await TeacherList.create({surname_N_P,positionListId,departmentListId})
        return res.json(teacher)
    }
    async getAll(req,res){
        const teachers = await TeacherList.findAll()
        return res.json(teachers)
    }
    async getAllJoined(req,res){
        const teachers = await TeacherList.findAll({

            include: [{
                model: DepartmentList,
                attributes: ['name'], 
            },
            {
                model: PositionList,
                attributes: ['short_name'], 
            }
    ]
        })
        return res.json(teachers)
    }

    async delete(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "ID заявки является обязательным параметром"});
        }

        const request = await TeacherList.findOne({ where: { id } });

        if (!request) {
            return res.status(404).json({message: "Заявка не найдена"});
        }

        await request.destroy();

        return res.json({message: "Заявка успешно удалена"});
    }
}

module.exports = new TeacherController()