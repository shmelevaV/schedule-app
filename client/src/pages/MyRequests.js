// Импорт необходимых библиотек и компонентов
import React from "react";
import RequestTable from "../components/Tables/RequestTable";
import { Container } from "react-bootstrap";
// Создание компонента MyRequests
const MyRequests = () =>{
    // Возвращаем разметку компонента
    return (
        // Контейнер для центрирования содержимого
        <Container className="mt-3">
        <RequestTable/>
        </Container>
    );
};
// Экспорт компонента MyRequests
export default MyRequests;
