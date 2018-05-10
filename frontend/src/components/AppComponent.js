import React, { Component } from 'react';
import {Container, Col, Row} from 'reactstrap';
import './AppComponent.css';
import logo from '../assets/logo.png';
import NavBar from '../containers/NavBar';

class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row className="d-flex flex-column">
            <Col xs="12" className="px-0">
                <header className="theme-dark px-4 py-2">
                    <img style={{height:'2rem', width:'auto'}} src={logo} alt="logo" />
                </header>
            </Col>
            <Col xs="12" className="px-0">
                <section className="theme-primary">
                    <NavBar />
                </section>
            </Col>
            <Col xs="12">
                <main>
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
  }
}

export default App;
