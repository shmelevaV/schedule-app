import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CreateGroup } from '../../http/groupAPI';

const CreateGroupModal = ({show, onHide}) => {
    const [groupName, setGroupName] = useState('');

    const handleInputChange = (event) => {
        setGroupName(event.target.value);
    };

    const handleAddClick = async () => {
        if (groupName) {
            await CreateGroup(groupName);
            onHide();
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить кафедру</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Название группы</Form.Label>
                        <Form.Control type="text" placeholder="Введите название группы" value={groupName} onChange={handleInputChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" disabled={!groupName} onClick={handleAddClick}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateGroupModal;
