# Project OSIRIUS (language learning)
[![Build Status](https://travis-ci.org/stPhoenix/projecttango.svg?branch=master)](https://travis-ci.org/stPhoenix/project_osirius)
[![Maintainability](https://api.codeclimate.com/v1/badges/04f4306c223fd14809a7/maintainability)](https://codeclimate.com/github/stPhoenix/project_osirius/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
### Hi
This django project was started to help learn foreign languages
For hoster we choose [heroku](http://heroku.com/) as it's a great hosting which has all our demands.
To practise with CLI(heroku supports) and CI we choose [travis](https://travis-ci.org/) and **it's work wonderful**!

As you have already understand - it's **standalone** website, so we doesn't made it as django app with setup.py.

#### Currently,
only telegram bot works. Yes, telegram bot wrote on django and have it's own command to start - **python manage.py runtelegrambot** 

#### What telegram bot (and also it's core - django app linguist) can do:
- search words in it's own lists;
- translate words over internet;
- add words to your words list;
- help you learn words with exercises:
    - match word with translation;
    - match translation with word;
    - look at the word and type translation;
    - look at the translation and type word;


### Actual libs and versions used in project you can find in *Pipfile* and *Pipfile.lock*


### If you have something to say - write to *saintdevs@gmail.com*
