import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { changeReqStatus, deleteReq, getReqLessons } from "../../http/lessonAPI";

const RequestTable = ({ extraActions = false })=> {

    const [scheduleReq, setScheduleReq] = useState([]);

    const fetchData = async () => {
        const scheduleDataReq = await getReqLessons();
        setScheduleReq(scheduleDataReq);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>№ заявки</th>
                        <th>Дата подачи</th>
                        <th>№ аудитории</th>
                        <th>№ пары</th>
                        <th>Преподаватель</th>
                        <th>Дисциплина</th>
                        <th>Группа</th>
                        <th>Дата первого занятия</th>
                        <th>Период</th>
                        <th>Дата последнего занятия</th>
                        <th>Статус</th>
                        <th colSpan={extraActions ? 3 : 1}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {scheduleReq.sort((a, b) => b.id - a.id).map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{new Date(item.submissionDate).toLocaleDateString()}</td>
                            <td>{item.auditorium_list && item.auditorium_list.number ? item.auditorium_list.number : 'NULL'}</td>
                            <td>{item.number}</td>
                            <td>{item.teacher_list&& item.teacher_list.surname_N_P ? item.teacher_list.surname_N_P : 'NULL'}</td>
                            <td>{item.discipline_list && item.discipline_list.short_name ? item.discipline_list.short_name : 'NULL'}</td>
                            <td>{item.group_list && item.group_list.name ? item.group_list.name : 'NULL'}</td>
                            <td>{new Date(item.firstDate).toLocaleDateString()}</td>
                            <td>{item.period}</td>
                            <td>{new Date(item.lastDate).toLocaleDateString()}</td>
                            <td>{item.status}</td>
                            <td>
                                <Button variant="danger"  onClick={async () => {await deleteReq(item.id);fetchData();}}>Удалить</Button>
                            </td>
                            {extraActions && (
                                <>
                                    <td>
                                        <Button variant="warning" onClick={async () => {await changeReqStatus(item.id, 'Отклонена');fetchData();}}>Отклонить</Button>
                                    </td>
                                    <td>
                                        <Button variant="success" onClick={async () => {await changeReqStatus(item.id, 'Одобрена');fetchData();}}>Одобрить</Button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default RequestTable;
