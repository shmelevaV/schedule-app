import React, { useContext, useState, useEffect } from "react";
import {Modal, Button, Form} from "react-bootstrap";
import { Context } from "../../index"; 
import { createReqLesson } from "../../http/lessonAPI";
import { getDisciplines } from "../../http/disciplineAPI";
import { getTeachers } from "../../http/TeacherAPI";
import { getGroups } from "../../http/groupAPI";
import { getAuds } from "../../http/audAPI";

const EditCellModal = ({ show, handleClose, selectedCell, getSelectedSchedule,updateSchedule}) => {
    const {day} = useContext(Context);
    const {week} = useContext(Context);
    const {startDate} = useContext(Context);
    const {aud} = useContext(Context);
    const{user}=useContext(Context)

    const [disciplines, setDisciplines] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [groups, setGroups] = useState([]);

    const [selectedDiscipline, setSelectedDiscipline] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const getAudId = async (audNumber) => {
        const auds = await getAuds();
        const aud = auds.find(aud => aud.number === audNumber);
        return aud ? aud.id : null;
    }

    useEffect(() => {
        getDisciplines().then(data => setDisciplines(data));
        getTeachers().then(data => setTeachers(data));
        getGroups().then(data => setGroups(data));
    }, []);

    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let currentDate = new Date(startDate.startDate); 
    currentDate.setDate(startDate.startDate.getDate()+7*(week.numberOfWeek-1)-startDate.startDate.getDay()+daysOfWeek.indexOf(selectedCell?.day ?? day.dayOfWeek)+1); 
    const handleRequest = async () => {

        const number =  Number(selectedCell?.lesson[0]);
        const submissionDate = new Date().toISOString().split('T')[0];
        const firstDate = currentDate.toISOString().split('T')[0];
        const period = 1;
        const lastDate = currentDate.toISOString().split('T')[0];
        const status = "Рассматривается";
        const teacherListId = selectedTeacher;
        const disciplineListId = selectedDiscipline;
        const groupListId = selectedGroup;

        const auditoriumListId = await getAudId(selectedCell?.aud || aud.numberOfAud);

        const data = await createReqLesson(number,submissionDate,firstDate,period,lastDate,
            status,teacherListId,disciplineListId,groupListId,auditoriumListId);
            
        setSelectedGroup(null);
        setSelectedTeacher(null);
        setSelectedDiscipline(null);
        updateSchedule();
        handleClose();
    }
    const allValuesSelected = selectedDiscipline && selectedTeacher && selectedGroup;


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
                                    <Form.Select value={selectedDiscipline} onChange={e => setSelectedDiscipline(e.target.value)}>
                                        <option value="">Выберите дисциплину</option>
                                        {disciplines.map(discipline => (
                                            <option value={discipline.id}>{discipline.name}</option>
                                        ))}
                                    </Form.Select>
                                    </div>
                                    <div style={{textAlign: "center"}}>
                                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Преподаватель</Form.Label>
                                        <Form.Select value={selectedTeacher} onChange={e => setSelectedTeacher(e.target.value)}>
                                            <option value="">Выберите преподавателя</option>
                                            {teachers.map(teacher => (
                                                <option value={teacher.id}>{teacher.surname_N_P}</option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                    <div style={{textAlign: "center"}}>
                                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Группа</Form.Label>
                                        <Form.Select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
                                            <option value="">Выберите группу</option>
                                            {groups.map(group => (
                                                <option value={group.id}>{group.name}</option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Закрыть
                                        </Button>
                                        <Button variant="primary" disabled={!allValuesSelected} onClick={handleRequest}>
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
