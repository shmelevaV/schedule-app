import React, { useContext } from "react";
import {Modal, Button, Form} from "react-bootstrap";
import { Context } from "../index"; 

const EditCellModal = ({ show, handleClose, selectedCell, getSelectedSchedule }) => {
    const { day } = useContext(Context);
    const {week} = useContext(Context);
    const {startDate} = useContext(Context);

    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let currentDate = new Date(startDate.startDate); 
    currentDate.setDate(startDate.startDate.getDate()+7*(week.numberOfWeek-1)-startDate.startDate.getDay()+daysOfWeek.indexOf(day.dayOfWeek)+1); 

    return (
        <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Просмотр ячейки</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label style={{fontSize: "20px"}}>Занятие в аудитории {selectedCell?.aud}, {selectedCell?.lesson}</Form.Label>
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
                        <>
                            <div style={{textAlign: "center"}}>
                                <Form.Label style={{fontWeight: "bold"}} className="mt-1">Номер недели</Form.Label>
                                <Form.Control type="text" placeholder="Введите номер недели" />
                            </div>
                            <div style={{textAlign: "center"}}>
                                <Form.Label style={{fontWeight: "bold"}} className="mt-1">День недели</Form.Label>
                                <Form.Control type="text" placeholder="Введите день недели" />
                            </div>
                            <div style={{textAlign: "center"}}>
                                <Form.Label style={{fontWeight: "bold"}} className="mt-1">Дата</Form.Label>
                                <Form.Control type="text" placeholder="Введите дату" />
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
                                <Form.Control type="text" placeholder="Введите название группы" />
                            </div>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Закрыть
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Сохранить изменения
                                </Button>
                            </Modal.Footer>
                        </>
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