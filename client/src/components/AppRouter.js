// Импорт необходимых библиотек и компонентов
import React, { useContext } from "react";
import {Routes, Route} from 'react-router-dom'
import { adminRoutes, authRoutes, publicRoutes} from "../routes";
import Schedule from "../pages/Schedule";
import {observer} from "mobx-react-lite";
import { Context } from "..";

// Создание компонента AppRouter с использованием observer
const AppRouter = observer(() =>{
    
    // Использование контекста для доступа к пользовательскому состоянию
    const {user} = useContext(Context)
    // Возвращаем разметку компонента
    return (
    <Routes>
        {/* Отображаем публичные маршруты */}
        {publicRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component/>} exact/>
        )}
        {/* Если пользователь авторизован, отображаем авторизованные маршруты */}
        {user.isAuth > 0 && authRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component/>} exact/>
        )}
        {/* Если пользователь - администратор, отображаем маршруты администратора */}
        {user.isAuth === 2 && adminRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component/>} exact/>
        )}
        {/* Если маршрут не найден, отображаем страницу расписания */}
        <Route path="*" element={<Schedule/>}/>
    </Routes>
    );
});
// Экспорт компонента AppRouter
export default AppRouter;