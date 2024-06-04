import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CreateType } from '../../http/typeAPI';

// Компонент модального окна для создания типа аудитории
const CreateAudType = ({show, onHide}) => {
    // Состояние для хранения названия типа аудитории
    const [TypeName, setTypeName] = useState('');
    // Обработчик изменения ввода названия типа аудитории
    const handleInputChange = (event) => {
        setTypeName(event.target.value);
    };
    // Обработчик нажатия кнопки "Добавить"
    const handleAddClick = async () => {
        if (TypeName) {
            await CreateType(TypeName);
            onHide();
        }
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить тип аудитории</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Название типа аудитории</Form.Label>
                        <Form.Control type="text" placeholder="Введите название типа аудитории" value={TypeName} onChange={handleInputChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" disabled={!TypeName} onClick={handleAddClick}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default CreateAudType;
