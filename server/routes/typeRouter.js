const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
// Определяем маршруты для различных HTTP-запросов
router.post('/', typeController.create) // Добавление нового типа аудитории
router.get('/', typeController.getAll) // Получение всех типов
router.delete('/:id',  typeController.delete); // Удаление типа по ID
module.exports = router