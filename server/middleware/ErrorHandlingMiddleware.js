const ApiError = require('../error/ApiError');
module.exports = function(err, req, res, next){
    // Если ошибка является экземпляром ApiError,
    if (err instanceof ApiError){
        // то возвращаем ответ со статусом ошибки и сообщением об ошибке
        return res.status(err.status).json({message: err.message})
    }
    // иначе возвращаем ответ со статусом 500 и сообщением о непредвиденной ошибке
    return res.status(500).json({message: "Непредвиденная ошибка!"})
}