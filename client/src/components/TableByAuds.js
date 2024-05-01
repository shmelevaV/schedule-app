import React, { useState }  from "react";
import {Table, Modal, Button, Form} from "react-bootstrap";
import './Table.css'; 

const TableByAuds = () => {

    const auditoriums = ['1-203а', '1-203б', '1-204', '1-208a', '1-208б'];
    const lessons = ['1 пара', '2 пара', '3 пара', '4 пара', '5 пара', '6 пара'];    

    const [show, setShow] = useState(false);
    const [selectedCell, setSelectedCell] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = (aud, lesson) => {
        setSelectedCell({ aud, lesson });
        setShow(true);
    };

    return (
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Аудитория</th>
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
                            <td key={index2} className="hoverable" onClick={() => handleShow(aud, lesson)}> {/* Здесь будет расписание */index + " "+ index2} </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование ячейки</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Расписание для {selectedCell?.aud}, {selectedCell?.lesson}</Form.Label>
                            <Form.Control type="text" placeholder="Введите расписание" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TableByAuds;
