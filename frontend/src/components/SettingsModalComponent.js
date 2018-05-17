import React from 'react';
import {Modal, ModalBody, Card, CardBody, CardTitle, CardText} from 'reactstrap';


export const SettingsModalComponent = (props) => {
    return (
        <Modal isOpen={props.modal} toggle={props.toggle_modal} className="p-0 align-self-center">
            <ModalBody className="p-0">
                <Card className="rounded-0">
                    <CardBody>
                        <CardTitle>Change password</CardTitle>
                        
                            <form>
                                 <div className="m-2 form-group">
                                    <label htmlFor="password1">New password</label>
                                    <input className="custom-form-control" type="password" name="password1" id="password1" placeholder="New password" onChange={props.handleChange} value={props.password1} />
                                 </div>
                                <div className="m-2 form-group">
                                    <label htmlFor="password2">Repeat password</label>
                                    <input className="custom-form-control" type="password" name="password2" id="password2" placeholder="Password" onChange={props.handleChange} value={props.password2} />
                                </div>
                            </form>
                        
                        <button className="btn btn-link" onClick={props.change_password}>Change</button>
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    );
};