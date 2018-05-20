import React from 'react';
import {Modal, ModalBody, Card, CardBody, CardTitle} from 'reactstrap';


export const AddwordsTypeModalComponent = (props) => {
    return (
        <Modal isOpen={props.modal} toggle={props.toggle_modal} className="p-0 align-self-center">
            <ModalBody className="p-0">
                <Card className="rounded-0">
                    <CardBody className="d-flex flex-column">
                        <CardTitle>Choose category</CardTitle>
                        
                            <form>
                                <select className="custom-form-control" id="learn_language" onChange={props.handleChange} name="category">
                                        {props.cats.map((category) => (<option key={category.name}>{category.name}</option>))}
                                </select>
                            </form>    
                        <button className="btn btn-link align-self-end" onClick={props.add_custom}>Add</button>
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    );
};