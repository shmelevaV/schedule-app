import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CreatePosition } from '../../http/positionAPI';

// Компонент модального окна для создания должности
const CreatePositionModal = ({show, onHide}) => {
    // Состояние для хранения названия и краткого названия должности
    const [PositionName, setPositionName] = useState('');
    const [PositionShortName, setPositionShortName] = useState('');

    // Обработчики изменения ввода названия и краткого названия должности
    const handleNameInputChange = (event) => {
        setPositionName(event.target.value);
    };
    const handleShortNameInputChange = (event) => {
        setPositionShortName(event.target.value);
    };

    // Обработчик нажатия кнопки "Добавить"
    const handleAddClick = async () => {
        if (PositionName && PositionShortName) {
            await CreatePosition(PositionName, PositionShortName);
            onHide();
        }
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить должность</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Название должности</Form.Label>
                        <Form.Control type="text" placeholder="Введите название должности" value={PositionName} onChange={handleNameInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Краткое название должности</Form.Label>
                        <Form.Control type="text" placeholder="Введите краткое название должности" value={PositionShortName} onChange={handleShortNameInputChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" disabled={!PositionName || !PositionShortName} onClick={handleAddClick}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default CreatePositionModal;
