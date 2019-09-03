import React from 'react';
import story1 from '../assets/story1.png';
import keyboard_feature from '../assets/keyboard_feature.png';
import match_feature from '../assets/match_feature.png';
import play_feature from '../assets/play_feature.png';
import presets_feature from '../assets/presets_feature.png';
import switch_feature from '../assets/switch_feature.png';
import translate_feature from '../assets/translate_feature.png';
import News from '../containers/News';
import './AppComponent.css';
import Feedback from '../containers/Feedback';

export const HomeComponent = () => {
    return (
        <div>
            <section className="row d-flex justify-content-center">
            <div className="col-12 col-md-11 col-xl-7 my-4">
                <div className="row d-flex flex-column flex-lg-row">
                    <div className="col-12 col-lg-6 col-xl-5">
                        <img src={story1} className="img-fluid" alt="Story" />
                    </div>
                    <div className="col-12 col-lg-6 col-xl-7 my-lg-auto">
                        <h2 className="text-center">Hello everyone!</h2>
                        <p className="text-center text-lg-left">
                           I've been trying to learn Japanese by myself from textbooks and manuals. When I started I had faced one big problem: how to learn words?
                           The popular solution is to make cards and learn by them. But honestly, for me it was too inconvenient - I'm too lazy to do such things. So I'd found another solution - to write a program that helps in studing Japanese words. And not only Japanese, other languages, too. Don't know why I wasn't lazy to code it)) I keep telling myself that laziness is the engine of progress.
                           Have you already guessed that you're using it right now?
                            <br />It's all for <strong>FREE</strong>!
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section className="row bg-second">
            <div className="col-12 d-flex mt-2">
                <h2 className="mx-auto">News</h2>
            </div>
            <div className="col-12 col-md-11 col-xl-7 mx-auto my-3">
                <News />
            </div>
        </section>
        <section className="row parallax-bg-2">
            <div className="col-12 bg-overlay py-5">
                <div className="row d-flex flex-column align-items-center">
                    <div className="col-12">
                        <h2 className="text-center text-white">What app can do for you:</h2>
                    </div>
                    <div className="col-12 col-md-11 col-xl-7 my-md-3">
                        <div className="card-deck">
                            <div className="card">
                                <img className="mx-auto" width="130rem" height="auto" src={translate_feature} alt="Learn foreign words" />
                                <div className="card-body">
                                    <p className="text-center">Help to learn words in different languages (main idea)</p>
                                </div>
                            </div>
                            <div className="card">
                                <img className="mx-auto" width="130rem" height="auto" src={switch_feature} alt="Switch languages feature" />
                                <div className="card-body">
                                    <p className="text-center">Switch between different learnt languages</p>
                                </div>
                            </div>
                            <div className="card">
                                <img className="mx-auto" width="130rem" height="auto" src={presets_feature} alt="Add words for learning from presets" />
                                <div className="card-body">
                                    <p className="text-center">Add words for learning from presets.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-11 col-xl-7 my-md-3">
                        <div className="card-deck">
                            <div className="card">
                                <img className="mx-auto" width="130rem" height="auto" src={keyboard_feature} alt="Keyboard" />
                                <div className="card-body">
                                    <p className="text-center">Add words for learning by typing (in this case app will search translation over internet)</p>
                                </div>
                            </div>
                            <div className="card">
                                <img className="mx-auto" width="130rem" height="auto" src={match_feature} alt="Matching" />
                                <div className="card-body">
                                    <p className="text-center">Study words by matching word with its translation (and reverse)</p>
                                </div>
                            </div>
                            <div className="card">
                                <img className="mx-auto" width="130rem" height="auto" src={play_feature} alt="Book" />
                                <div className="card-body">
                                    <p className="text-center">Study words by looking at word and typing translation(and reverse)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Feedback />
        </div>
    );
}