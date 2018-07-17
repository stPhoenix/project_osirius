import React from 'react';
import {ContentComponent} from '../components';
import { Card, CardTitle, CardText, CardHeader, CardBody, CardColumns} from 'reactstrap';


export const GetStartedComponent = () => {
    return (
    <ContentComponent>
            <div className="row flex-column flex-lg-row px-0">
                <CardColumns>
          <Card>
            <CardHeader>1. Sign Up</CardHeader>
            <CardBody>
                <CardTitle>If you not registered yet click Sign up link at menu bar and register. Otherwise - go to step 2.</CardTitle>
                <CardText>Sign up form is pretty simple. Aside from username, password and email fields, you should select your home language(the language you speak and understand) - foreign words translation will be on  this language, and choose learn language - language you want to learn.</CardText>
            </CardBody>
          </Card>
          <Card>
              <CardHeader>2. Add words</CardHeader>
                <CardBody>
                    <CardTitle>So, after you sign up, or log in you can see additional links in menu bar. Click on add words link.</CardTitle>
                    <CardText>You can use two ways to add foreign words for learn - by typing(system will try find word in database or internet) or by choosing from presets. If you choose presets - page will show words by category. If no words for your language pair(home language - learn language) you won't see anything. As service was made by me, current presets have words for pair english - japanese. I highly advise contributing in github for filling presets by words on different languages. Othewise - add words by typing based on your own needs.</CardText>
              </CardBody>
          </Card>
      <Card>
          <CardHeader>3. Learn words</CardHeader>
            <CardBody>
                <CardTitle>Okay, you have added words and ready to insert them into your brain. In your menu bar you can see link learn words. Click on it.</CardTitle>
                <CardText>Learn words page is represented like card with word on it. Aside from word, translation and pronucitaion fields it has two buttons: learned and not learned. If you think that you have remembered word - click learn and word will not appear more on this page. Otherwise - when you choose not learned - words will show as more times as you clicking not learned.</CardText>
          </CardBody>
      </Card>
      <Card>
          <CardHeader>4. Train words</CardHeader>
            <CardBody>
                <CardTitle>Now, when you have brief remembered words you should train them for not giving them run from your memory. At menu bar click on words trainer link.</CardTitle>
                <CardText>Each exercise on words trainer page enough described, so I won't stop here explaining it to you. What should mention - when you training words on each play once you gave right answer - word won't display on this play.</CardText>
          </CardBody>
      </Card>
      <Card>
          <CardHeader>5. Repeat step 2</CardHeader>
          <CardBody>
                    <CardTitle>Good! You have come to this step! I can consume that you undesrtood main logic of service. So what are you waiting for - repeat from step 2 and easy learn more foreign words!</CardTitle>
          </CardBody>
      </Card>
      <Card>
          <CardHeader>Additional advice 1</CardHeader>
          <CardBody>
                    <CardTitle>In settings you can add and remove learnt languages.</CardTitle>
                    <CardText> Way of doing it pretty intuitive. Remember, all words in pages Learn words, My words, Add words, Words trainer are relative to active learn language which set in Settings.</CardText>
          </CardBody>
      </Card>
                </CardColumns>
            </div>
    </ContentComponent>
        );
};