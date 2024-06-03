import React, { useEffect, useState } from "react";
import {Table, Button, Row, Col} from "react-bootstrap";
import { deleteLesson, getLessons } from "../../http/lessonAPI";
import CreateLessonModal from "../Modals/CreateLesson";

const LessonsTable = () => {

    const [schedule, setSchedule] = useState([]);

    const fetchData = async () => {
        const scheduleData = await getLessons();
        scheduleData.sort((a, b) => a.id - b.id);

        setSchedule(scheduleData);
    };
    const [showAudTypeModal, setShowAudTypeModal] = useState(false);

    const handleShowAudTypeModal = () => {
        setShowAudTypeModal(true);
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Button variant="primary" onClick={handleShowAudTypeModal} className="mt-3">Добавить занятие</Button>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID занятия</th>
                        <th>№ аудитории</th>
                        <th>№ пары</th>
                        <th>Преподаватель</th>
                        <th>Дисциплина</th>
                        <th>Группа</th>
                        <th>Дата первого занятия</th>
                        <th>Период</th>
                        <th>Дата последнего занятия</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.auditorium_list && item.auditorium_list.number ? item.auditorium_list.number : 'NULL'}</td>
                            <td>{item.number}</td>
                            <td>{item.teacher_list&& item.teacher_list.surname_N_P ? item.teacher_list.surname_N_P : 'NULL'}</td>
                            <td>{item.discipline_list && item.discipline_list.short_name ? item.discipline_list.short_name : 'NULL'}</td>
                            <td>{item.group_list && item.group_list.name ? item.group_list.name : 'NULL'}</td>
                            <td>{new Date(item.firstDate).toLocaleDateString()}</td>
                            <td>{item.period}</td>
                            <td>{new Date(item.lastDate).toLocaleDateString()}</td>
                            <td><Button variant="danger"  onClick={async () => {await deleteLesson(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateLessonModal show={showAudTypeModal} onHide={() => {setShowAudTypeModal(false);fetchData()}} />

        </>
    );
};

export default LessonsTable;
