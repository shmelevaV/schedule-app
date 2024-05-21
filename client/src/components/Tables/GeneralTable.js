import React from "react";
import {Table} from "react-bootstrap";
import "./Table.css"

const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const weeks = ['Четная', 'Нечетная'];
const lessons = ['1 пара', '2 пара', '3 пара', '4 пара', '5 пара', '6 пара'];

const GeneralTable = () =>{
    return(
        <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>День недели</th>
                                        <th>Неделя</th>
                                        {lessons.map((lesson, index) => (
                                            <th key={index}>{lesson}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {daysOfWeek.map((day, index) => (
                                        weeks.map((week, index2) => (
                                            <tr key={index * 2 + index2}>
                                                {index2 === 0 && <td rowSpan="2">{day}</td>}
                                                <td>{week}</td>
                                                {lessons.map((lesson, index3) => (
                                                    <td key={index3} className="hoverable"> {/* Здесь будет расписание */index3+1+" "+(index+1)+" "+(index2)} </td>
                                                ))}
                                            </tr>
                                        ))
                                    ))}
                                </tbody>
        </Table>
    );
}

export default GeneralTable;
