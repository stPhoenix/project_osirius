import React from 'react';
import {Container, UncontrolledCarousel} from 'reactstrap';
import slide1 from '../assets/slide1.png';
import slide2 from '../assets/slide2.png';
import slide3 from '../assets/slide3.png';
import slide4 from '../assets/slide4.png';
import NavBar from '../containers/NavBar';
import Login from '../containers/Login';
import Alerts from '../containers/Alerts';
import {Switch, Route} from 'react-router';
import Logout from '../containers/Logout';
import SignUp from '../containers/SignUp';
import Settings from '../containers/Settings';
import ScrollToTop from '../assets/scroll-to-top.png';
import {AddwordsComponent, MywordsComponent, WordstrainerComponent, GetStartedComponent, PrivacyPolicyComponent, CookiePolicyComponent, DataCollectionComponent, FooterComponent, HomeComponent} from '../components';
import Learnwords from '../containers/Learnwords';
import Policy from '../containers/Policy';
import './AppComponent.css';
import {Link} from 'react-router-dom';


const items = [
    {
        src: slide1,
        altText: '',
        caption: '',
    },
    {
        src: slide2,
        altText: '',
        caption: '',
    },
    {
        src: slide3,
        altText: '',
        caption: '',
    },
    {
        src: slide4,
        altText: '',
        caption: '',
    },
];

export const AppComponent = () => {
    
    // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = () => {scrollFunction()};

        const scrollFunction = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("scrollToTop").style.display = "flex";
        } else {
            document.getElementById("scrollToTop").style.display = "none";
        }
        }

        // When the user clicks on the button, scroll to the top of the document
        const topFunction = () => {
            const e = document.getElementsByTagName("body");
			e[0].scrollIntoView({block:"start", behavior: "smooth"});
        }  
        return (
      <Container fluid className="bg-first px-0">
        <div className="fixed-bottom m-3 justify-content-end mb-5" style={{display: "flex"}} id="scrollToTop">
            <img src={ScrollToTop} alt="Scroll To Top" className="theme-dark p-2" onClick={topFunction} />
        </div>
        <Policy />
        <header className="container-fluid sticky-top">
        <section className="row justify-content-center">
            <div className="col-12 col-lg-11 col-xl-7 theme-dark d-lg-flex shadow-sm">
                <NavBar />
            </div>
        </section>
    </header>
    <section className="container-fluid">
        <div className="row d-none d-lg-flex bg-banner mb-5">
            <div className="col-12 bg-overlay d-flex flex-column align-items-center font-exo-2bold text-white py-5">
                <h1 className="display-4 mt-5">HOW TO LEARN FOREIGN WORDS EASILY</h1>
                <h4 className="mb-5 mt-4">1. Sign Up  2. Add words  3. Learn words  4. Train words  5. Repeat step 2</h4>
            </div>
        </div>
    </section>
    <section className="container-fluid">
        <section className="row d-flex d-lg-none">
            <div className="col-12 px-0">
                 <UncontrolledCarousel items={items} />
            </div>
        </section>
        <section className="row parallax-bg-1 font-exo-2bold">
            <div className="col-12 bg-overlay d-flex justify-content-center px-0">
                <div className="col-12 col-lg-3 col-xl-2 d-flex flex-column my-5">
                    <Link className="btn btn-outline-white mb-2" to="/addwords">Add words</Link>
                    <Link className="btn btn-outline-white my-2" to="/learnwords">Learn words</Link>
                    <Link className="btn btn-outline-white my-2" to="/mywords">My words</Link>
                    <Link className="btn btn-outline-white mt-2" to="/wordstrainer">Train words</Link>
                </div>
            </div>
        </section>
    </section>
    <main className="container-fluid">
        <Alerts />
         <Switch>
             <Route exact path="/" component={HomeComponent} />
             <Route path="/login" component={Login} />
             <Route path="/logout" component={Logout} />
             <Route path="/signup" component={SignUp} />
             <Route path="/settings" component={Settings} />
             <Route path="/addwords" component={AddwordsComponent} />
             <Route path="/mywords" component={MywordsComponent} />
             <Route path="/learnwords" component={Learnwords} />
             <Route path="/wordstrainer" component={WordstrainerComponent} />
             <Route path="/getstarted" component={GetStartedComponent} />
             <Route path="/privacy_policy" component={PrivacyPolicyComponent} />
             <Route path="/cookie_policy" component={CookiePolicyComponent} />
             <Route path="/data_collection" component={DataCollectionComponent} />
            </Switch>
    </main>
    <FooterComponent />
    </Container>
    );
  };