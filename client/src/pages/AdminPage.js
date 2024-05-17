import React, { useContext } from "react";
import AdminRequestTable from "../components/AdminRequestTable";
import { Col, Container, Row } from "react-bootstrap";
import TableBar from "../components/TableBar";
import { Context } from "../index"; 
import RequestTable from "../components/RequestTable";
import TypeTable from "../components/TypeTable";
import { observer } from "mobx-react-lite";
import DepartmentTable from "../components/DepartmentTable";
import GroupTable from "../components/GroupTable";
import DisciplineTable from "../components/DisciplineTable";
import PositionTable from "../components/PositionTable";
import TeacherTable from "../components/TeacherTable";
import AudTable from "../components/AudTable";
import LessonsTable from "../components/LessonsTable";
import UsersTable from "../components/UsersTable";

const AdminPage = observer( () =>{
    const {table} = useContext(Context);

    let currentTable;
    switch(table.activeTable) {
        case "Справочник заявок":
             currentTable = <RequestTable/>;
            break;
        case "Справочник кафедр":
             currentTable = <DepartmentTable/>;
            break;
        case "Справочник групп":
             currentTable = <GroupTable/>;
            break;
        case "Справочник дисциплин":
             currentTable = <DisciplineTable/>;
            break;
        case "Справочник типов аудиторий":
            currentTable = <TypeTable/>;
            break;
        case "Справочник должностей":
            currentTable = <PositionTable/>;
            break;
        case "Справочник преподавателей":
            currentTable = <TeacherTable/>;
            break;
        case "Справочник аудиторий":
            currentTable = <AudTable/>;
            break;
        case "Справочник занятий":
            currentTable = <LessonsTable/>;
            break;
        case "Справочник учетных записей":
            currentTable = <UsersTable/>;
            break;        
        default:
             currentTable = <RequestTable/>;
    }

    return (
        <Container className="mt-3">
            <Row>
            <Col md={2}>
                <TableBar/>
            </Col>
            <Col md={10}>
                {currentTable} 
            </Col>
            </Row>
        </Container>
    );
})

export default AdminPage;
