import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index"; 
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const SideBar = observer(() => {
    const { view } = useContext(Context);
    const { day } = useContext(Context);
    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
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
                        value="по дням"
                        checked={view.scheduleView === "по дням"}
                        onChange={handleChange}
                        style={{marginRight: '5px'}}
                    />
                     По дням
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
            {
                view.scheduleView === "по дням"?
                <div>
                <h6 style={{textAlign: "center"}}>№ Аудитории</h6>
                <h6 style={{textAlign: "center"}}>№ Недели</h6>
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
                <h6 style={{textAlign: "center",marginTop: '5px'}} >Дата</h6>
                </div>
                :
                <div> </div>
            }
        </div>
    );
});

export default SideBar;
