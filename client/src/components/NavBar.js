import React, { useContext } from 'react'
import {Context} from "../index"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import {Button} from "react-bootstrap"
import { ADMIN_ROUTE, LOGIN_ROUTE, SCHEDULE_ROUTE } from "../utils/consts"
import { NavLink} from 'react-router-dom'
import {observer} from "mobx-react-lite"
import {useNavigate} from 'react-router-dom'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    return(
        <Navbar bg="primary" data-bs-theme="dark">
         <Container>
            <NavLink  style = {{color:'white'}} to = {SCHEDULE_ROUTE}>Главная</NavLink>
        {user.isAuth === 0 ?
          <Nav className="ml-auto">
            <Button variant={"outline-light"} onClick ={() => {user.setIsAuth(2);navigate(LOGIN_ROUTE)}}>Авторизация</Button>
          </Nav>
          :
          user.isAuth === 1 ?
          <Nav className="ml-auto">
          <Button variant={"outline-light"} style={{ marginLeft: '0.5rem' }} >Мои заявки</Button>
          <Button variant={"outline-light"} style={{ marginLeft: '0.5rem' }} onClick ={() => {user.setIsAuth(0);navigate(LOGIN_ROUTE)}}>Выйти</Button>
          </Nav>
          :
          <Nav className="ml-auto">
          <Button variant={"outline-light"} style={{ marginLeft: '0.5rem' }} >Мои заявки</Button>
          <Button variant={"outline-light"} style={{ marginLeft: '0.5rem' }} onClick ={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>
          <Button variant={"outline-light"} style={{ marginLeft: '0.5rem' }} onClick ={() => {user.setIsAuth(0);navigate(LOGIN_ROUTE)}} >Выйти</Button>
          </Nav>
        }
         </Container>
        
        </Navbar>
    );
});

export default NavBar;