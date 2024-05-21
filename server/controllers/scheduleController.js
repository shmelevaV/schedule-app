const {ClassSchedule,AuditoriumList, DisciplineList, TeacherList, GroupList} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize');

class scheduleController{
    async create(req,res){
         const {number,firstDate,period,lastDate,teacherListId,disciplineListId,groupListId,auditoriumListId} = req.body
         const request = await ClassSchedule.create({number,firstDate,period,lastDate,teacherListId,disciplineListId,groupListId,auditoriumListId})
        return res.json(request)
    }
    async getAll(req, res) {
        const {  start_date, weekNumber, dayOfWeek } = req.query; //body for POSTMAN
       
        let startDate=new Date(start_date);
        let currentDate = new Date(startDate); 
        const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        currentDate.setDate(startDate.getDate() + 7 * (weekNumber - 1) - startDate.getDay() + daysOfWeek.indexOf(dayOfWeek) + 1);

        const schedule = await ClassSchedule.findAll({
            where: {
                firstDate: {
                    [Op.lte]: currentDate // дата первого занятия должна быть меньше или равна текущей дате
                },
                lastDate: {
                    [Op.gte]: currentDate // дата последнего занятия должна быть больше или равна текущей дате
                }
            },
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
   
// Проходим по всему списку schedule
let result = [];
for (let j = 0; j < schedule.length; j++) {
    let tempDate = new Date(schedule[j].firstDate);
    let tempLastDate = new Date(schedule[j].lastDate);
    tempDate.setDate(tempDate.getDate());

    // Проверяем условие для каждого элемента в списке
    for(let i = 0; tempDate <= tempLastDate; i++){
        if(currentDate.getDate() === tempDate.getDate()){
            result.push(schedule[j]); // Добавляем текущий элемент в результат
        }
        tempDate.setDate(tempDate.getDate() + 7 * schedule[j].period);
    }
}

return res.json(result);

    }
    async getAll2(req, res) {

        const schedule = await ClassSchedule.findAll({

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