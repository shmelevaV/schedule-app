import React, { useContext, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const TableBar = observer(() => {
    const {table} = useContext(Context);

    const handleItemClick = (tableName) => {
        table.setActiveTable(tableName);
    };

    return (
        <ListGroup as="ul">
            <ListGroup.Item as="li" active={table.activeTable === 'Справочник заявок'} onClick={() => handleItemClick('Справочник заявок')} style={{cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis'}}>Справочник заявок</ListGroup.Item>
            <ListGroup.Item as="li" active={table.activeTable === 'Справочник занятий'} onClick={() => handleItemClick('Справочник занятий')} style={{cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis'}}>Справочник занятий</ListGroup.Item>
            <ListGroup.Item as="li" active={table.activeTable === 'Справочник учетных записей'} onClick={() => handleItemClick('Справочник учетных записей')} style={{cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis'}}>Справочник учетных записей</ListGroup.Item>
            <ListGroup.Item as="li" active={table.activeTable === 'Справочник преподавателей'} onClick={() => handleItemClick('Справочник преподавателей')} style={{cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis'}}>Справочник преподавателей</ListGroup.Item>
            <ListGroup.Item as="li" active={table.activeTable === 'Справочник групп'} onClick={() => handleItemClick('Справочник групп')} style={{cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis'}}>Справочник групп</ListGroup.Item>
            <ListGroup.Item as="li" active={table.activeTable === 'Справочник дисциплин'} onClick={() => handleItemClick('Справочник дисциплин')} style={{cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis'}}>Справочник дисциплин</ListGroup.Item>
            <ListGroup.Item as="li" active={table.activeTable === 'Справочник аудиторий'} onClick={() => handleItemClick('Справочник аудиторий')} style={{cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis'}}>Справочник аудиторий</ListGroup.Item>
            <ListGroup.Item as="li" active={table.activeTable === 'Справочник типов аудиторий'} onClick={() => handleItemClick('Справочник типов аудиторий')} style={{cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis'}}>Справочник типов аудиторий</ListGroup.Item>
            <ListGroup.Item as="li" active={table.activeTable === 'Справочник должностей'} onClick={() => handleItemClick('Справочник должностей')} style={{cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis'}}>Справочник должностей</ListGroup.Item>
            <ListGroup.Item as="li" active={table.activeTable === 'Справочник кафедр'} onClick={() => handleItemClick('Справочник кафедр')} style={{cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis'}}>Справочник кафедр</ListGroup.Item>
        </ListGroup>
    );
})

export default TableBar;
