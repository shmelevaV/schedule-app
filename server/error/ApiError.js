// Определяем класс ApiError, который наследуется от встроенного класса Error
class ApiError extends Error {
    // Конструктор принимает статус ошибки и сообщение об ошибке
    constructor(status, message){
        super(); // Вызываем конструктор родительского класса
        this.status = status // Сохраняем статус ошибки
        this.message = message // Сохраняем сообщение об ошибке
    }
    // Статический метод для создания ошибки с статусом 404 (Не найдено)
    static badRequest(message){
        return new ApiError (404, message)
    }
    // Статический метод для создания ошибки с статусом 500 (Внутренняя ошибка сервера)
    static internal(message){
        return new ApiError (500, message)
    }
    // Статический метод для создания ошибки с статусом 403 (Запрещено)
    static forbidden(message){
        return new ApiError (403, message)
    }
}
module.exports = ApiError
