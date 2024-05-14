import React, { useState, useEffect, useContext } from "react";
import {Table, Modal, Button, Form} from "react-bootstrap";
import './Table.css'; 
import { Context } from "../index"; 
import { getAuds} from "../http/audAPI";
import { getLessons, getReqLessons} from "../http/lessonAPI";
import EditCellModal from "./Modal";

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
    const [scheduleReq, setScheduleReq] = useState([]); // Добавляем состояние для расписания из заявок

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAuds();
            setAuditoriums(data.map(aud => aud.number));

             const scheduleData = await getLessons(startDate.startDate,week.numberOfWeek,day.dayOfWeek);
             const scheduleDataReq = await getReqLessons();
             setSchedule(scheduleData); // Устанавливаем расписание
             setScheduleReq(scheduleDataReq); // Устанавливаем расписание из заявок
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
        // for(let i=0;i<schedule.length;i++){
        //     if(schedule[i].number ===nOfPair){
        //         if(schedule[i].auditorium_list.number===aud){
        //             return { text: (schedule[i].discipline_list.short_name + " " + schedule[i].group_list.name), color: "white" };
        //         }
        //     }
        // }
        // for(let i=0;i<scheduleReq.length;i++){
        //     if(scheduleReq[i].number ===nOfPair){
        //         if(scheduleReq[i].auditorium_list.number===aud){
        //             return { text: (scheduleReq[i].discipline_list.short_name + " " + scheduleReq[i].group_list.name), color: "green" };
        //         }
        //     }
        // }
        // // Добавляем проверку для scheduleReq
        // for(let i=0;i<scheduleReq.length;i++){
        //     if(scheduleReq[i].number ===nOfPair){
        //         if(scheduleReq[i].auditorium_list.number===aud){
        //             if(scheduleReq[i].status === "Рассматривается"){
        //                 return { text: (scheduleReq[i].discipline_list.short_name + " " + scheduleReq[i].group_list.name), color: "yellow" };
        //             }
        //             else if(scheduleReq[i].status === "Одобрена"){
        //                 return { text: (scheduleReq[i].discipline_list.short_name + " " + scheduleReq[i].group_list.name), color: "green" };
        //             }
        //         }
        //     }
        // }
        for(let i=0;i<scheduleReq.length;i++){
            if(scheduleReq[i].number === nOfPair){
                if(scheduleReq[i].auditorium_list.number===aud.numberOfAud){
                    let currentDate = new Date(startDate.startDate); 
                    currentDate.setDate(startDate.startDate.getDate() + 7 * (week.numberOfWeek - 1) - startDate.startDate.getDay() + day.dayOfWeek + 1);
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
                            <td key={index2} className="hoverable" onClick={() => handleShow(aud, lesson)} style={{backgroundColor: getlesn(aud,index2+1,schedule).color}}>
                                {
                               getlesn(aud,index2+1,schedule).text
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
        />

        </>
    );
};

export default TableByAuds;
