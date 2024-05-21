import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import TableBar from "../components/TableBar";
import { Context } from "../index"; 
import RequestTable from "../components/Tables/RequestTable";
import TypeTable from "../components/Tables/TypeTable";
import { observer } from "mobx-react-lite";
import DepartmentTable from "../components/Tables/DepartmentTable";
import GroupTable from "../components/Tables/GroupTable";
import DisciplineTable from "../components/Tables/DisciplineTable";
import PositionTable from "../components/Tables/PositionTable";
import TeacherTable from "../components/Tables/TeacherTable";
import AudTable from "../components/Tables/AudTable";
import LessonsTable from "../components/Tables/LessonsTable";
import UsersTable from "../components/Tables/UsersTable";
import CreateDepartment from "../components/Modals/CreateDepartment";
import CreateAudType from "../components/Modals/CreateAudType";

const AdminPage = observer( () =>{
    const {table} = useContext(Context);
    const [showDepartmentModal, setShowDepartmentModal] = useState(false);
    const [showAudTypeModal, setShowAudTypeModal] = useState(false);

    const handleShowDepartmentModal = () => {
        setShowDepartmentModal(true);
    };

    const handleShowAudTypeModal = () => {
        setShowAudTypeModal(true);
    };
    const tfun = () => {
        table.setActiveTable("Справочник аудиторий");
    };
    let currentTable;
    let AddButton;
    switch(table.activeTable) {
        case "Справочник заявок":
             currentTable = <RequestTable extraActions={true} />;
             AddButton = <Button variant="primary">Добавить заявку</Button>;
            break;
        case "Справочник кафедр":
             currentTable = <DepartmentTable/>;
             AddButton = <Button variant="primary" onClick={handleShowDepartmentModal}>Добавить кафедру</Button>;
            break;
            case "Справочник групп":
                currentTable = <GroupTable/>;
                AddButton = <Button variant="primary">Добавить группу</Button>;
               break;
           case "Справочник дисциплин":
                currentTable = <DisciplineTable/>;
                AddButton = <Button variant="primary">Добавить дисциплину</Button>;
               break;
           case "Справочник типов аудиторий":
               currentTable = <TypeTable/>;
               AddButton = <Button variant="primary" onClick={handleShowAudTypeModal}>Добавить тип</Button>;
               break;
           case "Справочник должностей":
               currentTable = <PositionTable/>;
               AddButton = <Button variant="primary">Добавить должность</Button>;
               break;
           case "Справочник преподавателей":
               currentTable = <TeacherTable/>;
               AddButton = <Button variant="primary">Добавить преподавателя</Button>;
               break;
           case "Справочник аудиторий":
               currentTable = <AudTable/>;
               AddButton = <Button variant="primary">Добавить аудиторию</Button>;
               break;
           case "Справочник занятий":
               currentTable = <LessonsTable/>;
               AddButton = <Button variant="primary">Добавить занятие</Button>;
               break;
           case "Справочник учетных записей":
               currentTable = <UsersTable/>;
               AddButton = <Button variant="primary">Добавить учетную запись</Button>;
               break;        
           default:
                currentTable = <RequestTable/>;
                AddButton = <Button variant="primary">Добавить заявку</Button>;
       }
   

   
    return (
    <>

        <Row className="mt-3 "  style={{ paddingLeft: '15px' }}>
            <Col md={1}>
                <TableBar/>
            </Col>
            <Col md={1} >
                {currentTable} 
            </Col>
        </Row>

        <CreateDepartment show={showDepartmentModal} onHide={() => setShowDepartmentModal(false)} />
        <CreateAudType show={showAudTypeModal} onHide={() => {setShowAudTypeModal(false);tfun()}} />
    </>
    );
})

export default AdminPage;
