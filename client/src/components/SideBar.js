import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from ".."; 
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { getAuds } from "../http/audAPI";

// Компонент боковой панели
const SideBar = observer(() => {
    //получаем необходимые данные из контекста
    const {view} = useContext(Context); 
    const {day} = useContext(Context); 
    const {week} = useContext(Context); 
    const {aud} = useContext(Context); 
    const {startDate} = useContext(Context);

    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const weeks = Array.from({length: 18}, (_, i) => i + 1); 

    // Получение списка аудиторий
    const [auditoriums, setAuditoriums] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAuds();
            setAuditoriums(data.map(aud => aud.number));
        };
        fetchData();
    }, []);

    // Вычисление текущей даты
    let currentDate = new Date(startDate.startDate); 
    currentDate.setDate(startDate.startDate.getDate()+7*(week.numberOfWeek-1)-startDate.startDate.getDay()+daysOfWeek.indexOf(day.dayOfWeek)+1); 

    // Обработчик изменения представления
    const handleChange = (event) => {
        view.setScheduleView(event.target.value);
    };
    return (
        <div style={{border: '1px solid black', padding: '10px', borderRadius: '5px'}}>
           <h6 style={{textAlign: "center"}}>Вариант отображения</h6>
            <div>
                <label>
                    <input
                        type="radio"
                        value="общий"
                        checked={view.scheduleView === "общий"}
                        onChange={handleChange}
                        style={{marginRight: '5px'}}
                    />
                     Общий
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="по аудиториям"
                        checked={view.scheduleView === "по аудиториям"}
                        onChange={handleChange}
                        style={{marginRight: '5px'}}
                    />
                    По аудиториям
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="по дням"
                        checked={view.scheduleView === "по дням"}
                        onChange={handleChange}
                        style={{marginRight: '5px'}}
                    />
                     По дням
                </label>
            </div>

            {/* В зависимости от выбранного представления отображаются разные элементы управления */}
            {
                view.scheduleView === "по дням"?
                <div>
                <h6 style={{textAlign: "center"}}>№ Аудитории</h6>
                <div className="d-flex justify-content-center">
                    <Dropdown as={ButtonGroup} >
                        <Button variant="" style={{outline: '1px solid #000'}}>{aud.numberOfAud}</Button>
                        <Dropdown.Toggle split variant="secondary" id="dropdown-custom-2" style={{outline: '1px solid #000'}}/>
                        <Dropdown.Menu className="super-colors" >
                            {auditoriums.map((NumberOfAud, index) => (
                                <Dropdown.Item key={index} onClick={() => aud.setNumberOfAud(NumberOfAud)}>
                                    {NumberOfAud}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <h6 style={{textAlign: "center"}}>№ Недели</h6>
                <div className="d-flex justify-content-center">
                    <Dropdown as={ButtonGroup} >
                        <Button variant="" style={{outline: '1px solid #000'}}>{week.numberOfWeek}</Button>
                        <Dropdown.Toggle split variant="secondary" id="dropdown-custom-2" style={{outline: '1px solid #000'}}/>
                        <Dropdown.Menu className="super-colors" >
                            {weeks.map((NumberOfWeek, index) => (
                                <Dropdown.Item key={index} onClick={() => week.setNumberOfWeek(NumberOfWeek)}>
                                    {NumberOfWeek}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                </div>
                :
                view.scheduleView === "по аудиториям"?
                <div>
                <h6 style={{textAlign: "center",marginTop: '5px'}}>День недели</h6>

                <div className="d-flex justify-content-center">
                    <Dropdown as={ButtonGroup} >
                        <Button variant="" style={{outline: '1px solid #000'}}>{day.dayOfWeek}</Button>
                        <Dropdown.Toggle split variant="secondary" id="dropdown-custom-2" style={{outline: '1px solid #000'}}/>
                        <Dropdown.Menu className="super-colors" >
                            {daysOfWeek.map((dayOfWeek, index) => (
                                <Dropdown.Item key={index} onClick={() => day.setDayOfWeek(dayOfWeek)}>
                                    {dayOfWeek}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <h6 style={{textAlign: "center",marginTop: '5px'}}>№ Недели</h6>
                <div className="d-flex justify-content-center">
                    <Dropdown as={ButtonGroup} >
                        <Button variant="" style={{outline: '1px solid #000'}}>{week.numberOfWeek}</Button>
                        <Dropdown.Toggle split variant="secondary" id="dropdown-custom-2" style={{outline: '1px solid #000'}}/>
                        <Dropdown.Menu className="super-colors" >
                            {weeks.map((NumberOfWeek, index) => (
                                <Dropdown.Item key={index} onClick={() => week.setNumberOfWeek(NumberOfWeek)}>
                                    {NumberOfWeek}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <h6 style={{textAlign: "center",marginTop: '5px'}} >Дата</h6>
                <label style={{ display: 'block', textAlign: 'center' }}>{currentDate.toLocaleDateString()}</label>
                </div>
                :
                <div>             <h6 style={{textAlign: "center"}}>№ Аудитории</h6>
                <div className="d-flex justify-content-center">
                    <Dropdown as={ButtonGroup} >
                        <Button variant="" style={{outline: '1px solid #000'}}>{aud.numberOfAud}</Button>
                        <Dropdown.Toggle split variant="secondary" id="dropdown-custom-2" style={{outline: '1px solid #000'}}/>
                        <Dropdown.Menu className="super-colors" >
                            {auditoriums.map((NumberOfAud, index) => (
                                <Dropdown.Item key={index} onClick={() => aud.setNumberOfAud(NumberOfAud)}>
                                    {NumberOfAud}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                </div>
            }
        </div>
    );
});

export default SideBar;
