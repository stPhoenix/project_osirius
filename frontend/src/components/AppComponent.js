import React from 'react';
import {Container, Col, Row} from 'reactstrap';
import './AppComponent.css';
import logo from '../assets/logo.png';
import NavBar from '../containers/NavBar';
import Login from '../containers/Login';
import Alerts from '../containers/Alerts';
import {Switch, Route} from 'react-router';
import News from '../containers/News';
import Logout from '../containers/Logout';
import {SignUpComponent} from '../components';


export const AppComponent = () => {
        return (
      <Container fluid className="bg-first">
        <Row className="d-flex flex-column">
            <Col xs="12" className="px-0" style={{zIndex:1}}>
                <header className="theme-dark px-4 py-2">
                    <img style={{height:'2rem', width:'auto'}} src={logo} alt="logo" />
                </header>
            </Col>
            <Col xs="12" className="px-0" style={{zIndex:1}}>
                <section className="theme-primary shadow-sm full-screen">
                    <NavBar/>
                </section>
            </Col>
            <Col xs="12 px-0">
                <main className="d-flex flex-column full-screen">
                    <Alerts />
                    <section className="d-flex justify-content-center align-items-center">
                        <Switch>
                            <Route exact path="/" component={News} />
                            <Route path="/news" component={News} />
                            <Route path="/login" component={Login} />
                            <Route path="/logout" component={Logout} />
                            <Route path="/signup" component={SignUpComponent} />
                        </Switch>
                    </section>
                    
                </main>
            </Col>
        </Row>
        <Row className="d-flex flex-column">
            <Col xs="12">
                <footer>
                </footer>
            </Col>
        </Row>
      </Container>
    );
  };

