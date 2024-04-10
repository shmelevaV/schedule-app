import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const Auth = () =>{

    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    return (
    <Container className="d-flex justify-content-center align-items-center"
    style={{height: window.innerHeight - 54}}
    >
<Card style={{width: 600}} className="p-5">
    <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
    <Form className="d-flex flex-column">
        <Form.Control 
            className="mt-3"
            placeholder="Введите ваш email"
        />
        <Form.Control 
            className="mt-3"
            placeholder="Введите ваш пароль"
        />
        <Row className="mt-3">
            {isLogin ?
                    <Col>
                        <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>, если у вас нет аккаунта.
                    </Col>
                    :
                    <Col>
                        <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>, если у вас уже есть аккаунт.
                    </Col>

            }

            <Col className="d-flex justify-content-end">
                <Button variant={"outline-success"}>
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Button>
            </Col>
        </Row>
    </Form>
</Card>

    </Container>
    );
};

export default Auth;