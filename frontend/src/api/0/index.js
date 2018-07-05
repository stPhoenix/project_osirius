import axios from 'axios';

//export const get_langs = async () => {
//    let api_response = {result: false, message: "Bad", data: []};
//    await axios.get("/langs/", {headers:{AUTHORIZATION:`TOKEN ${token}`}})
//    .then((response) => (response_handler(api_response, response)))
//    .catch((error) => (error_handler(api_response, error)));
//    return api_response;
//};

//const backend_url = process.env.REACT_APP_BACKEND_URL;
axios.defaults.baseURL =  "http://127.0.0.1:8000/api/v0";

const error_handler = (api_response, error) => {
    console.log(error.response);
        api_response.result = false;
        api_response.message = JSON.stringify(error.response.data).replace("\"", "").replace("{", "").replace("}", "").replace("[", "").replace("]", "").replace("'", "");
    };

const response_handler = (api_response, response) => {
    console.log(response);
    api_response.result = true;
    api_response.message = response.statusText;
    api_response.data = response.data;
};

export const get_news = async () => {
    let api_response = {result: false, message: "Bad", data: []};
    
    await axios.get("/news/")
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
};

export const login = async (username, password) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.post("/auth/login/",{
        username: username,
        password: password,
    }).then((response) => (response_handler(api_response, response)))
      .catch((error) => (error_handler(api_response, error)));
    await get_user(api_response.data.key)
        .then(user => {
        api_response.data = {...api_response.data, user};
                })
    return api_response;
};

export const logout = async (token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.post("/auth/logout/", {headers:{AUTHORIZATION:`TOKEN ${token}`}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
};

export const sign_up = async (props) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.post("/auth/register", {...props})
    .then((response) => (response_handler(api_response, response)))
    .catch((error) => (error_handler(api_response, error)));
    return api_response;
};

export const change_password = async (password1, password2, password, token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.post("/auth/password/change/", {new_password1: password1,
                                               new_password2: password2,
                                               old_password: password},
                                              {headers:{AUTHORIZATION:`TOKEN ${token}`}})
    .then((response) => (response_handler(api_response, response)))
    .catch((error) => (error_handler(api_response, error)));
    return api_response;
};

export const get_user = async (token) => {
    let user;
    await axios.get("/auth/user", {headers:{AUTHORIZATION:`TOKEN ${token}`}})
        .then(response => (user=response.data))
        .catch(error => (error_handler(user, error)));
    return user;
};

export const update_user = async (user, token) => { 
    let api_response = {result: false, message: "Bad", data: []};
    await axios.put("/auth/user/",{...user},{headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then(response => (response_handler(api_response, response)))
        .catch(error => (error_handler(api_response, error)));
    return api_response;
};

export const add_custom_word = async (word, token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.post("/add/custom/",{...word},{headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then(response => (response_handler(api_response, response)))
        .catch(error => (error_handler(api_response, error)));
    return api_response;
};

export const add_global_word = async (word, token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.post("/add/global/",{pk:word},{headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then(response => (response_handler(api_response, response)))
        .catch(error => (error_handler(api_response, error)));
    return api_response;
};

export const get_cats = async (token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.get("/cats/", {headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response; 
};

export const get_words_by_cat = async (cat_id, token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.get(`/cats/${cat_id}/words`, {headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response; 
};

export const get_langs = async () => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.get("/langs/")
    .then((response) => (response_handler(api_response, response)))
    .catch((error) => (error_handler(api_response, error)));
    return api_response;
};

export const get_learn_word = (token) => {
  return {result:true, message:"All ok", data:{
    "id": 5,
    "category_set": [
        {
            "pk": 2,
            "name": "Greetings"
        }
    ],
    "name": "こんばんは",
    "translation": "good evening",
    "pronunciation": "Konbanwa",
    "viewed": false,
    "played_match": false,
    "played_reversed_match": false,
    "played_typing": false,
    "played_reversed_typing": false,
    "language": 29,
    "student": 5
}};  
};

export const set_learn_word = (pk, token) => {
    return {result:true, message:"All ok"};
};

export const play_matching = (token) => {
    return {result:true, message:"All ok", data:{
    "words": [
        {
            "id": 18,
            "category_set": [
                {
                    "pk": 2,
                    "name": "Greetings"
                }
            ],
            "name": "はじめまして",
            "translation": "Nice to meet you",
            "pronunciation": "Hajimemashite",
            "viewed": false,
            "played_match": false,
            "played_reversed_match": false,
            "played_typing": false,
            "played_reversed_typing": false,
            "language": 29,
            "student": 5
        },
        {
            "id": 14,
            "category_set": [
                {
                    "pk": 2,
                    "name": "Greetings"
                }
            ],
            "name": "ただいま",
            "translation": "I'm home",
            "pronunciation": "Tadaima",
            "viewed": false,
            "played_match": false,
            "played_reversed_match": false,
            "played_typing": false,
            "played_reversed_typing": false,
            "language": 29,
            "student": 5
        },
        {
            "id": 7,
            "category_set": [
                {
                    "pk": 2,
                    "name": "Greetings"
                }
            ],
            "name": "おやすみなさい",
            "translation": "good night",
            "pronunciation": "Oyasuminasai",
            "viewed": false,
            "played_match": false,
            "played_reversed_match": false,
            "played_typing": false,
            "played_reversed_typing": false,
            "language": 29,
            "student": 5
        }
    ],
    "answer": {
        "id": 7,
        "category_set": [
            {
                "pk": 2,
                "name": "Greetings"
            }
        ],
        "name": "おやすみなさい",
        "translation": "good night",
        "pronunciation": "Oyasuminasai",
        "viewed": false,
        "played_match": false,
        "played_reversed_match": false,
        "played_typing": false,
        "played_reversed_typing": false,
        "language": 29,
        "student": 5
    }
    }};
};

export const result_play_matching = (word_pk, answer_pk, token) => {
    return {result:true, message:"All ok"};
};

export const play_typing = (reverse, token) => {
  return {result:true, message:"All ok", data:{
    "words": [
        {
            "id": 8,
            "category_set": [
                {
                    "pk": 2,
                    "name": "Greetings"
                }
            ],
            "name": "ありがとう",
            "translation": "Thank you",
            "pronunciation": "Arigatō",
            "viewed": false,
            "played_match": false,
            "played_reversed_match": false,
            "played_typing": false,
            "played_reversed_typing": false,
            "language": 29,
            "student": 5
        }
    ],
    "answer": {
        "id": 8,
        "category_set": [
            {
                "pk": 2,
                "name": "Greetings"
            }
        ],
        "name": "ありがとう",
        "translation": "Thank you",
        "pronunciation": "Arigatō",
        "viewed": false,
        "played_match": false,
        "played_reversed_match": false,
        "played_typing": false,
        "played_reversed_typing": false,
        "language": 29,
        "student": 5
    }
}};  
};

export const result_play_typing = (reverse, word_pk, answer, token) => {
  return {result:true, message:"All ok"};  
};

export const search_word = async (word, token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.post("/search/word/",{word},{headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then(response => (response_handler(api_response, response)))
        .catch(error => (error_handler(api_response, error)));
    return api_response;
};

export const get_user_words = async (token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.get("/user/words/", {headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;   
};

export const delete_word = async (word_pk, token) => {
    console.log(token);
    let api_response = {result: false, message: "Bad", data: []};
    await axios.delete(`/user/words/${word_pk}`, {"pk": word_pk, headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
}

export const learn_again_word = (pk, token) => {
    return {result:true, message:"All ok"};
};

export const get_learned_words = async (token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.get("/user/words/learned", {headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
};