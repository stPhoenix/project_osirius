# Project OSIRIUS (language learning)
[![Maintainability](https://api.codeclimate.com/v1/badges/04f4306c223fd14809a7/maintainability)](https://codeclimate.com/github/stPhoenix/project_osirius/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
### About
This django project was started to help learn foreign languages

#### What telegram bot and web version can do:
- search words in it's own lists;
- translate words over internet;
- add words to your words list;
- help you learn words with exercises:
    - match word with translation;
    - match translation with word;
    - look at the word and type translation;
    - look at the translation and type word;

### Usage

1. Create .env file from DUMMY.env
2. In frontend folder create .env file from example.env , where backend - ip of your backend(local ip of pc)
3. Run 
```shell
docker compose up -d
```
4. Visit http://localhost:8000/


### Troubleshoot

If for some reason front end failed to start - navigate to frontend folder and run:
```shell
npm install
```

then restart docker compose