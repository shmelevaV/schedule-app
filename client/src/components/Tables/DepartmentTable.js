import React, { useEffect, useState } from "react";
import {Table, Button, Row, Col} from "react-bootstrap";
import { deleteDepartment, getDepartments } from "../../http/departmentAPI";
import CreateDepartmentModal from "../Modals/CreateDepartment";

const DepartmentTable = () => {

    const [departments, setDepartments] = useState([]);

    const fetchData = async () => {
        const departmentData = await getDepartments();
        departmentData.sort((a, b) => a.name.localeCompare(b.name));
        setDepartments(departmentData);
    };

    const [showDepartmentModal, setShowDepartmentModal] = useState(false);

    const handleShowDepartmentModal = () => {
        setShowDepartmentModal(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>

            <Button variant="primary" onClick={handleShowDepartmentModal} className="mt-3">Добавить кафедру</Button>


            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID кафедры</th>
                        <th>Название кафедры</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td><Button variant="danger" onClick={async () => {await deleteDepartment(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateDepartmentModal show={showDepartmentModal} onHide={() => {setShowDepartmentModal(false);fetchData()}} />
        </>
    );
};

export default DepartmentTable;
