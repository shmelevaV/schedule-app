const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {UserAcc, TeacherList} = require('../models/models')

const generateJwt = (id, login, role, teacherListId) =>{
    return jwt.sign(
        {id, login, role, teacherListId},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )

}

class UserController{
    async registration(req,res,next){
        const {login,password,role}=req.body 

        if(!login || !password){
            return next(ApiError.badRequest('Неверный email или password'))
        }
        const candidate = await UserAcc.findOne({where: {login}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        let teacherListId=1;
        const user = await UserAcc.create({login,password: hashPassword,role,teacherListId})
        const token = generateJwt(user.id, user.login, user.role, user.teacherListId)
        return res.json({token})
    }
    async login(req,res, next){
        const {login, password}=req.body
        const user = await UserAcc.findOne({where: {login}})
        if (!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        if (!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.login, user.role, user.teacherListId)
        return res.json({token})
    }
    async check(req,res, next){
        const token = generateJwt(req.user.id,req.user.login,req.user.role, req.user.teacherListId)
        return res.json({token})
    }

    async getAll(req,res){
        const users = await UserAcc.findAll({

            include: [{
                model: TeacherList,
                attributes: ['surname_N_P'], // указываем, что хотим включить только поле 'number'
            },
    ]
        });
   
        return res.json(users)
    }
    async delete(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "ID заявки является обязательным параметром"});
        }

        const request = await UserAcc.findOne({ where: { id } });

        if (!request) {
            return res.status(404).json({message: "Заявка не найдена"});
        }

        await request.destroy();

        return res.json({message: "Заявка успешно удалена"});
    }

}

module.exports = new UserController()