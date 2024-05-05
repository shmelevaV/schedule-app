import React, { useState, useEffect, useContext } from "react";
import {Table, Modal, Button, Form} from "react-bootstrap";
import './Table.css'; 
import { Context } from "../index"; 
import { getAuds} from "../http/audAPI";
import { getLessons} from "../http/lessonAPI";

const TableByAuds = () => {
    const lessons = ['1 пара', '2 пара', '3 пара', '4 пара', '5 пара', '6 пара'];    
    const { day } = useContext(Context);
    const {week} = useContext(Context);
    const {startDate} = useContext(Context);

    const [show, setShow] = useState(false);
    const [selectedCell, setSelectedCell] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = (aud, lesson) => {
        setSelectedCell({ aud, lesson });
        setShow(true);
    };
    const [auditoriums, setAuditoriums] = useState([]);
    const [schedule, setSchedule] = useState([]); // Добавляем состояние для расписания

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAuds();
            setAuditoriums(data.map(aud => aud.number));

             const scheduleData = await getLessons(startDate.startDate,week.numberOfWeek,day.dayOfWeek);
             setSchedule(scheduleData); // Устанавливаем расписание
        };
        fetchData();
    }, [week.numberOfWeek, day.dayOfWeek]);
    const getSelectedSchedule = () => {
        if (selectedCell) {
            const selectedLessonNumber = lessons.indexOf(selectedCell.lesson) + 1;
            return schedule.find(item => item.number === selectedLessonNumber && item.auditorium_list.number === selectedCell.aud);
        }
        return null;
    }
    const getlesn = (aud,nOfPair,schedule)=>{
        schedule.find(item => item.number === nOfPair)
        for(let i=0;i<schedule.length;i++){
            if(schedule[i].number ===nOfPair){
                if(schedule[i].auditorium_list.number===aud){
                    return (schedule[i].discipline_list.short_name + " " + schedule[i].group_list.name)
                }

            }
        }
        return ""
    }
    
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
                            <td key={index2} className="hoverable" onClick={() => handleShow(aud, lesson)}>
                                {
                               getlesn(aud,index2+1,schedule)
                                }
                            </td>
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
                        <Form.Label>Занятие в аудитории {selectedCell?.aud}, {selectedCell?.lesson}</Form.Label>
                        {
                            getSelectedSchedule() ? (
                                <>
                                    <Form.Control type="text" value={week.numberOfWeek} />
                                    <Form.Control type="text" value={day.dayOfWeek} />
                                    <Form.Control type="text" value="Дата" />
                                    <Form.Control type="text" value={getSelectedSchedule().discipline_list.short_name} />
                                    <Form.Control type="text" value={getSelectedSchedule().teacher_list.surname_N_P}/>
                                    <Form.Control type="text" value={getSelectedSchedule().group_list.name} />
                                </>
                            ) : (
                                <p>Нет данных для выбранной ячейки</p>
                            )
                        }
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
