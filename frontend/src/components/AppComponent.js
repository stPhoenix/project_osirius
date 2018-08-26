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
import SignUp from '../containers/SignUp';
import Settings from '../containers/Settings';
import {AddwordsComponent, MywordsComponent, WordstrainerComponent, AboutComponent, GetStartedComponent, PrivacyPolicyComponent, CookiePolicyComponent, DataCollectionComponent, FooterComponent} from '../components';
import Learnwords from '../containers/Learnwords';
import Policy from '../containers/Policy';


export const AppComponent = () => {
        return (
      <Container fluid className="bg-first">
        <Policy />
        <Row className="d-flex flex-column">
            <Col xs="12" className="px-0" style={{zIndex:1}}>
                <header className="theme-dark px-4 py-2">
                    <img style={{height:'2rem', width:'auto'}} src={logo} alt="logo" />
                </header>
            </Col>
            <Col xs="12" >
                <Row className="flex-column flex-lg-row">
                    <Col xs="12" lg="3" className="px-0" style={{zIndex:1}}>
                        <section className="theme-primary shadow-sm full-screen h-100">
                            <NavBar/>
                        </section>
                    </Col>
                    <Col xs="12" lg="9" className="px-0">
                        <main className="d-flex flex-column full-screen">
                            <Alerts />
                            <section className="d-flex justify-content-center align-items-center">
                            <Switch>
                                <Route exact path="/" component={News} />
                                <Route path="/news" component={News} />
                                <Route path="/login" component={Login} />
                                <Route path="/logout" component={Logout} />
                                <Route path="/signup" component={SignUp} />
                                <Route path="/settings" component={Settings} />
				                <Route path="/addwords" component={AddwordsComponent} />
                                <Route path="/mywords" component={MywordsComponent} />
                                <Route path="/learnwords" component={Learnwords} />
				                <Route path="/wordstrainer" component={WordstrainerComponent} />
                                <Route path="/about" component={AboutComponent} />
                                <Route path="/getstarted" component={GetStartedComponent} />
                                <Route path="/privacy_policy" component={PrivacyPolicyComponent} />
                                <Route path="/cookie_policy" component={CookiePolicyComponent} />
                                <Route path="/data_collection" component={DataCollectionComponent} />


                            </Switch>
                            </section>
                    
                        </main>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row className="d-flex theme-dark">
            <Col xs="12">
                <FooterComponent />
            </Col>
        </Row>
      </Container>
    );
  };

