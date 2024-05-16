import React, { useContext, useEffect, useState } from "react";
import {Table, Modal, Button, Form} from "react-bootstrap";
import './Table.css'; 
import { Context } from "../index"; 
import { getLessons2, getReqLessons } from "../http/lessonAPI";
import EditCellModal from "./Modal";

const TableByDays = () => {
    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const lessons = ['1 пара', '2 пара', '3 пара', '4 пара', '5 пара', '6 пара'];    
    const {aud} = useContext(Context);
    const {week} = useContext(Context);
    const [show, setShow] = useState(false);
    const [selectedCell, setSelectedCell] = useState(null);
    const {startDate} = useContext(Context);
    const { day } = useContext(Context);

    const handleClose = () => setShow(false);
    const handleShow = (day, lesson) => {
        setSelectedCell({ day, lesson });
        setShow(true);
    };
    
    const [schedule, setSchedule] = useState([]); // Добавляем состояние для расписания
    const [scheduleReq, setScheduleReq] = useState([]); // Добавляем состояние для расписания из заявок

    const fetchData = async () => {
        const scheduleData = await getLessons2();
        const scheduleDataReq = await getReqLessons();
        setSchedule(scheduleData); // Устанавливаем расписание
        setScheduleReq(scheduleDataReq); // Устанавливаем расписание из заявок
    };

    useEffect(() => {

        fetchData();

    }, [week.numberOfWeek,aud.numberOfAud]);

    const getSelectedSchedule = () => {
        if (selectedCell) {
            const selectedLessonNumber = lessons.indexOf(selectedCell.lesson) + 1;
        for(let i=0;i<schedule.length;i++){
            if(schedule[i].number ===selectedLessonNumber){
                if(schedule[i].auditorium_list.number===aud.numberOfAud){
                    let currentDate = new Date(startDate.startDate); 
                    currentDate.setDate(startDate.startDate.getDate() + 7 * (week.numberOfWeek - 1) - startDate.startDate.getDay() + daysOfWeek.indexOf(selectedCell.day) + 1);
                    let tempDate = new Date(schedule[i].firstDate);
                    let tempLastDate = new Date(schedule[i].lastDate);
                    tempDate.setDate(tempDate.getDate());
                   
                    for(let j = 0; tempDate <= tempLastDate; j++){
                       if(currentDate.toLocaleDateString()===tempDate.toLocaleDateString()){
                        return schedule[i];
                       }
                       tempDate.setDate(tempDate.getDate() + 7 * schedule[i].period);
                    }
                }
            }
        }

        for(let i=0;i<scheduleReq.length;i++){
            if(scheduleReq[i].number === selectedLessonNumber){
                if(scheduleReq[i].auditorium_list.number===aud.numberOfAud){
                    let currentDate = new Date(startDate.startDate); 
                    currentDate.setDate(startDate.startDate.getDate() + 7 * (week.numberOfWeek - 1) - startDate.startDate.getDay() + daysOfWeek.indexOf(selectedCell.day) + 1);
                    let tempDate = new Date(scheduleReq[i].firstDate);
                    let tempLastDate = new Date(scheduleReq[i].lastDate);
                    tempDate.setDate(tempDate.getDate());
                   
                    for(let j = 0; tempDate <= tempLastDate; j++){
                       if(currentDate.toLocaleDateString()===tempDate.toLocaleDateString()){
                            return scheduleReq[i]
                       }
                       tempDate.setDate(tempDate.getDate() + 7 * scheduleReq[i].period);
                    }
                }
            }
        }
    }
        return null;
    } 
    const getlesn = (dayOfWeek,nOfPair,schedule)=>{

        for(let i=0;i<schedule.length;i++){
            if(schedule[i].number ===nOfPair){
                if(schedule[i].auditorium_list.number===aud.numberOfAud){
                    let currentDate = new Date(startDate.startDate); 
                    currentDate.setDate(startDate.startDate.getDate() + 7 * (week.numberOfWeek - 1) - startDate.startDate.getDay() + dayOfWeek + 1);
                    let tempDate = new Date(schedule[i].firstDate);
                    let tempLastDate = new Date(schedule[i].lastDate);
                    tempDate.setDate(tempDate.getDate());
                   
                    for(let j = 0; tempDate <= tempLastDate; j++){
                       if(currentDate.toLocaleDateString()===tempDate.toLocaleDateString()){
                        return{ text: (schedule[i].discipline_list.short_name + " " + schedule[i].group_list.name), color: "white" };
                       }
                       tempDate.setDate(tempDate.getDate() + 7 * schedule[i].period);
                    }
                }
            }
        }

        for(let i=0;i<scheduleReq.length;i++){
            if(scheduleReq[i].number === nOfPair){
                if(scheduleReq[i].auditorium_list.number===aud.numberOfAud){
                    let currentDate = new Date(startDate.startDate); 
                    currentDate.setDate(startDate.startDate.getDate() + 7 * (week.numberOfWeek - 1) - startDate.startDate.getDay() + dayOfWeek + 1);
                    let tempDate = new Date(scheduleReq[i].firstDate);
                    let tempLastDate = new Date(scheduleReq[i].lastDate);
                    tempDate.setDate(tempDate.getDate());
                   
                    for(let j = 0; tempDate <= tempLastDate; j++){
                       if(currentDate.toLocaleDateString()===tempDate.toLocaleDateString()){
                        if(scheduleReq[i].status === "Рассматривается"){
                            return { text: (scheduleReq[i].discipline_list.short_name + " " + scheduleReq[i].group_list.name), color: "yellow" };
                        }
                        else if(scheduleReq[i].status === "Одобрена"){
                            return { text: (scheduleReq[i].discipline_list.short_name + " " + scheduleReq[i].group_list.name), color: "green" };
                        }
                       }
                       tempDate.setDate(tempDate.getDate() + 7 * scheduleReq[i].period);
                    }
                }
            }
        }
        return { text: "", color: "white" };
    }

    return (
        <>
                       <Table striped bordered>
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
                                <td key={index2}  onClick={() => handleShow(day, lesson)} style={{backgroundColor: getlesn(index,index2+1,schedule).color}} className="hoverable">
                                {
                                    getlesn(index,index2+1,schedule).text
                                }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditCellModal
            show={show}
            handleClose={handleClose}
            selectedCell={selectedCell}
            getSelectedSchedule={getSelectedSchedule}
            updateSchedule={fetchData}
        />
        </>
    );
};

export default TableByDays;