const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const UserAcc = sequelize.define('user_acc',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const TeacherList = sequelize.define('teacher_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    surname_N_P:{type: DataTypes.STRING},
})

const PositionList = sequelize.define('position_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true},
    short_name:{type: DataTypes.STRING},
})

const DepartmentList = sequelize.define('department_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true},
})

const DisciplineList = sequelize.define('discipline_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true},
    short_name:{type: DataTypes.STRING},
})

const GroupList = sequelize.define('group_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true},
})

const AuditoriumList = sequelize.define('auditorium_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number:{type: DataTypes.STRING, unique: true}, // номер аудитории
    сapacity:{type: DataTypes.INTEGER}, //вместимость //уточнить notnull
})

const ClassSchedule = sequelize.define('class_schedule',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number:{type: DataTypes.INTEGER}, //номер пары
    firstDate:{type: DataTypes.DATEONLY}, //дата первого занятия
    period:{type: DataTypes.INTEGER}, //периодиность занятия
    lastDate:{type: DataTypes.DATEONLY}, //дата последнего занятия
})

const RequestList = sequelize.define('request_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number:{type: DataTypes.INTEGER}, //номер пары
    submissionDate:{type: DataTypes.DATEONLY}, //дата подачи заявки
    firstDate:{type: DataTypes.DATEONLY}, //дата первого занятия
    period:{type: DataTypes.INTEGER}, //периодиность занятия
    lastDate:{type: DataTypes.DATEONLY}, //дата последнего занятия
    status:{type: DataTypes.STRING},
})

const TypeList = sequelize.define('type_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true},
})


TeacherList.hasMany(ClassSchedule)
ClassSchedule.belongsTo(TeacherList)

TeacherList.hasMany(UserAcc)
UserAcc.belongsTo(TeacherList)

TeacherList.hasMany(RequestList)
RequestList.belongsTo(TeacherList)

PositionList.hasMany(TeacherList)
TeacherList.belongsTo(PositionList)

DepartmentList.hasMany(TeacherList)
TeacherList.belongsTo(DepartmentList)

DisciplineList.hasMany(RequestList)
RequestList.belongsTo(DisciplineList)

GroupList.hasMany(RequestList)
RequestList.belongsTo(GroupList)

AuditoriumList.hasMany(RequestList)
RequestList.belongsTo(AuditoriumList)

DisciplineList.hasMany(ClassSchedule)
ClassSchedule.belongsTo(DisciplineList)

GroupList.hasMany(ClassSchedule)
ClassSchedule.belongsTo(GroupList)

AuditoriumList.hasMany(ClassSchedule)
ClassSchedule.belongsTo(AuditoriumList)

TypeList.hasMany(AuditoriumList)
AuditoriumList.belongsTo(TypeList)


module.exports = {
    UserAcc,
    TeacherList,
    PositionList,
    DepartmentList,
    DisciplineList,
    GroupList,
    AuditoriumList,
    ClassSchedule,
    RequestList,
    TypeList,
}