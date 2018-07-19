import React from 'react';
import {Modal, ModalBody, Card, CardBody, CardTitle} from 'reactstrap';
import PropTypes from 'prop-types';

const componentProps = {
    handleChange: PropTypes.func,
    toggle_modal: PropTypes.func,
    change_password: PropTypes.func,
    password1: PropTypes.string,
    password2: PropTypes.string,
    password: PropTypes.string,
    modal: PropTypes.bool,
};

export const SettingsModalComponent = (props) => {
    return (
        <Modal isOpen={props.modal} toggle={props.toggle_modal} className="p-0 align-self-center">
            <ModalBody className="p-0">
                <Card className="rounded-0">
                    <CardBody className="d-flex flex-column">
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
                                <div className="m-2 form-group">
                                    <label htmlFor="password">Old password</label>
                                    <input className="custom-form-control" type="password" name="password" id="password" placeholder="Password" onChange={props.handleChange} value={props.password} />
                                </div>
                            </form>
                        
                        <button className="btn btn-link align-self-end" onClick={props.change_password}>Change</button>
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    );
};

SettingsModalComponent.propTypes = componentProps;