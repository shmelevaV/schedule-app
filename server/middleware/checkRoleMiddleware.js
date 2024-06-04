const jwt = require('jsonwebtoken')
// Экспортируем функцию, которая принимает роль и возвращает middleware
module.exports = function(role){
    return function (req, res, next){
        // Если метод запроса - OPTIONS, просто переходим к следующему middleware
        if(req.method === "OPTIONS"){next()}
        try{
            // Извлекаем токен из заголовка авторизации
            const token = req.headers.authorization.split(' ')[1] 
            // Если токен отсутствует, отправляем ответ со статусом 401 (Не авторизован)
            if (!token){return res.status(401).json({message:"Не авторизован"})}
            // Проверяем токен
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            // Проверяем, соответствует ли роль пользователя требуемой роли
            if(role === 'ADMIN' && decoded.role !== 'ADMIN'){
                // Если пользователь не администратор, отправляем ответ со статусом 403 (Запрещено)
                return res.status(403).json({message:"Нет доступа"})
            }
            // Сохраняем расшифрованные данные токена в объекте запроса
            req.user = decoded
            // Переходим к следующему middleware
            next()
        } catch(e){
            // Если произошла ошибка, отправляем ответ со статусом 401 (Не авторизован)
            res.status(401).json({message:"Не авторизован"})}}}