import React from "react";
import {Table} from "react-bootstrap";


const TableByDays = () => {

    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const lessons = ['1 пара', '2 пара', '3 пара', '4 пара', '5 пара', '6 пара'];    

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>День недели</th>
                    {lessons.map((lesson, index) => (
                        <th key={index}>{lesson}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {daysOfWeek.map((day, index) => (
                    <tr key={index}>
                        <td>{day}</td>
                        {lessons.map((lesson, index2) => (
                            <td key={index2}> {/* Здесь будет ваше расписание */index + " "+ index2} </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TableByDays;
