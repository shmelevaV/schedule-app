import React, { useContext, useState } from "react";
import {Modal, Button, Form} from "react-bootstrap";
import { Context } from "../index"; 
import { createReqLesson } from "../http/lessonAPI";

const EditCellModal = ({ show, handleClose, selectedCell, getSelectedSchedule,updateSchedule}) => {
    const {day} = useContext(Context);
    const {week} = useContext(Context);
    const {startDate} = useContext(Context);
    const {aud} = useContext(Context);
    const{user}=useContext(Context)

    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let currentDate = new Date(startDate.startDate); 
    currentDate.setDate(startDate.startDate.getDate()+7*(week.numberOfWeek-1)-startDate.startDate.getDay()+daysOfWeek.indexOf(selectedCell?.day ?? day.dayOfWeek)+1); 
    const [group, setGroup] = useState("");
    const [numOfLesson, setNumOfLesson] = useState("");
    const handleRequest = async () => {

        const number =  Number(selectedCell?.lesson[0]);
        const submissionDate = "2024-05-14";
        const firstDate = currentDate.toISOString().split('T')[0];
        const period = 1;
        const lastDate = currentDate.toISOString().split('T')[0];
        const status = "Рассматривается";
        const teacherListId = 1;
        const disciplineListId = 2;
        const groupListId = Number(group);
        const auditoriumListId = 2;

        const data = await createReqLesson(number,submissionDate,firstDate,period,lastDate,
            status,teacherListId,disciplineListId,groupListId,auditoriumListId);
            
        setGroup("");
        // Обработайте полученные данные
        // ...
        updateSchedule();
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Просмотр ячейки</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
            <Form.Label style={{fontSize: "20px"}}>Занятие в аудитории {selectedCell?.aud || aud.numberOfAud}, {selectedCell?.lesson}</Form.Label>
                {
                    getSelectedSchedule() ? (
                        <>
                            <div style={{textAlign: "center"}}>
                                <Form.Label style={{fontWeight: "bold"}} className="mt-1">Номер недели</Form.Label>
                                <Form.Control type="text" value={week.numberOfWeek} />
                            </div>
                            <div style={{textAlign: "center"}}>
                                <Form.Label style={{fontWeight: "bold"}} className="mt-1">День недели</Form.Label>
                                <Form.Control type="text" value={day.dayOfWeek} />
                            </div>
                            <div style={{textAlign: "center"}}>
                                <Form.Label style={{fontWeight: "bold"}} className="mt-1">Дата</Form.Label>
                                <Form.Control type="text" value={currentDate.toLocaleDateString()} />
                            </div>
                            <div style={{textAlign: "center"}}>
                                <Form.Label style={{fontWeight: "bold"}} className="mt-1">Дисциплина</Form.Label>
                                <Form.Control type="text" value={getSelectedSchedule().discipline_list.short_name} />
                            </div>
                            <div style={{textAlign: "center"}}>
                                <Form.Label style={{fontWeight: "bold"}} className="mt-1">Преподаватель</Form.Label>
                                <Form.Control type="text" value={getSelectedSchedule().teacher_list.surname_N_P}/>
                            </div>
                            <div style={{textAlign: "center"}}>
                                <Form.Label style={{fontWeight: "bold"}} className="mt-1">Группа</Form.Label>
                                <Form.Control type="text" value={getSelectedSchedule().group_list.name} />
                            </div>
                        </>
                    ) : (
                        user.isAuth !== 0 && (
                            <>
                                <div style={{textAlign: "center"}}>
                                    <Form.Label style={{fontWeight: "bold"}} className="mt-1">Номер недели</Form.Label>
                                    <Form.Control type="text" value={week.numberOfWeek}/>
                                </div>
                                <div style={{textAlign: "center"}}>
                                    <Form.Label style={{fontWeight: "bold"}} className="mt-1">День недели</Form.Label>
                                    <Form.Control type="text"  value={selectedCell?.day || day.dayOfWeek}/>
                                </div>
                                <div style={{textAlign: "center"}}>
                                    <Form.Label style={{fontWeight: "bold"}} className="mt-1">Дата</Form.Label>
                                    <Form.Control type="text" value={currentDate.toLocaleDateString()} />
                                </div>
                                <div style={{textAlign: "center"}}>
                                    <Form.Label style={{fontWeight: "bold"}} className="mt-1">Дисциплина</Form.Label>
                                    <Form.Control type="text" placeholder="Введите дисциплину" />
                                </div>
                                <div style={{textAlign: "center"}}>
                                    <Form.Label style={{fontWeight: "bold"}} className="mt-1">Преподаватель</Form.Label>
                                    <Form.Control type="text" placeholder="Введите имя преподавателя" />
                                </div>
                                <div style={{textAlign: "center"}}>
                                    <Form.Label style={{fontWeight: "bold"}} className="mt-1">Группа</Form.Label>
                                    <Form.Control type="text" placeholder="Введите название группы" value={group} onChange={e => setGroup(e.target.value)} />
                                </div>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Закрыть
                                    </Button>
                                    <Button variant="primary" onClick={handleRequest}>
                                        Отправить заявку
                                    </Button>
                                </Modal.Footer>
                            </>
                        )                   
                    )
                }
            </Form.Group>
        </Form>
    </Modal.Body>
    {getSelectedSchedule() && (
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Закрыть
            </Button>
        </Modal.Footer>
    )}

        </Modal>
    );
};

export default EditCellModal;