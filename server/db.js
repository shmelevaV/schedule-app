// Импортируем Sequelize
const {Sequelize} = require('sequelize')
// Экспортируем новый экземпляр Sequelize
module.exports = new Sequelize(
    process.env.DB_NAME, // Имя базы данных
    process.env.DB_USER, // Имя пользователя
    process.env.DB_PASSWORD, // Пароль
    {
        dialect:'postgres', // Диалект SQL
        host: process.env.DB_HOST, // Хост базы данных
        port: process.env.DB_PORT // Порт базы данных
    }
)