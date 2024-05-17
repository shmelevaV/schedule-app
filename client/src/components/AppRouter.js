import React, { useContext } from "react";
import {Routes, Route} from 'react-router-dom'
import { adminRoutes, authRoutes, publicRoutes} from "../routes";
import Schedule from "../pages/Schedule";
import {observer} from "mobx-react-lite";
import { Context } from "../index";

const AppRouter = observer(() =>{
    
    const {user} = useContext(Context)
    return (
    <Routes>

        {user.isAuth > 0 && authRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component/>} exact/>
        )}

        {publicRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component/>} exact/>
        )}
        {user.isAuth === 2 && adminRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component/>} exact/>
        )}

        <Route path="*" element={<Schedule/>}/>
    </Routes>
    );
});

export default AppRouter;