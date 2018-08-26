import React, {Component} from 'react';
import {check_policy, set_policy} from '../actions/policy';
import {Alert, Button, Modal,   ModalBody, ModalFooter } from 'reactstrap';
import {CookiePolicyComponent} from '../components';


export default class Policy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            visible: true,
        };

        this.toggle = this.toggle.bind(this);
        this.accept_policy = this.accept_policy.bind(this);
    };
    
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    };
    
    accept_policy(e) {
        e.preventDefault();
        set_policy();
        this.setState({visible: false});
    };
    
    render() {
        return (<div>
            {check_policy() ? <Alert color="info" className="fixed-top" isOpen={this.state.visible}>
                                <h4 className="alert-heading">Notice</h4>
                                    <p>
                                        This website or its third-party tools use cookies, which are necessary to its functioning and required to achieve the purposes illustrated in the cookie policy. If you want to know more or withdraw your consent to all or some of the cookies, please refer to the <Button color="link" className="pt-0 pb-1 px-0" onClick={this.toggle}>cookie policy</Button>.
                                    </p>
                                <hr />
                                <p className="mb-0">
                                    <Button color="link" className="mb-1 py-1" onClick={this.accept_policy}>Accept</Button> <a href="https://google.com" >Disgard</a>
                                </p>
                                </Alert> : null}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody>
                        <CookiePolicyComponent />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    };
}