import React from 'react';
import {ContentComponent} from '../components';

      
export const AboutComponent = () => {
    return (
    <ContentComponent>
            <h2 className="align-self-start">Hello everyone!</h2>
        <p className="align-self-start">I've been trying to <b>learn</b> Japanese by myself from textbooks and manuals.</p>
        <p className="align-self-start"> When I started I had faced one big problem: how to <b>learn words</b>?
        The popular solution is to make cards and learn by them. But honestly, for me it was too inconvenient - I'm too lazy to do such things.</p>
        <p className="align-self-start">So I'd found another solution - to write a program that helps in studing Japanese words. And not only Japanese, <b>other languages</b>, too. Don't know why I wasn't lazy to code it)) I keep telling myself that laziness is the engine of progress.
        </p>
        <p className="align-self-start">First I wrote a telegram bot. It was <b>convenient</b> in learning words but inconvenient in managing word lists (i.e. deleting learnt words and adding new ones). So my next step was to <b>upgrade</b> that telegram bot to a web version.
        Have you already guessed that you're using it right now?
        </p>
        <ul className="align-self-start">What this app can do for <b>you</b>:
            <li>- help to <b>learn</b> words in different languages (main idea);</li>
            <li>- switch between different learnt languages;</li>
            <li>- add words for <b>learning</b> from presets;</li>
            <li>- add words for <b>learning</b> by typing (in this case app will search translation over internet);</li>
            <li>- <b>study words</b>:<ul>
                <li>+ by matching word with its translation (and reverse);</li>
                <li>+ by looking at word and typing translation(and reverse);</li></ul></li>
            </ul>
        <p className="align-self-start">It's all for <b>FREE!</b></p>
        <p className="align-self-start">
        If you're interested in code or want to contribute - welcome to <a href="https://github.com/stPhoenix/project_osirius">Github!</a>
        </p>
    </ContentComponent>
        );
};