import React from "react";
import {Table} from "react-bootstrap";


const TableByAuds = () => {

    const auditoriums = ['1-203а', '1-203б', '1-204', '1-208a', '1-208б'];
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
                {auditoriums.map((aud, index) => (
                    <tr key={index}>
                        <td>{aud}</td>
                        {lessons.map((lesson, index2) => (
                            <td key={index2}> {/* Здесь будет ваше расписание */index + " "+ index2} </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TableByAuds;
