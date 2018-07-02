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
    await axios.get("/auth/password/change/", {headers:{AUTHORIZATION:`TOKEN ${token}`},
                                              new_password1: password1,
                                              new_password2: password2,
                                              old_password: password})
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
    let headers = {AUTHORIZATION:`TOKEN ${token}`};
    await axios.put("/auth/user/", {headers, ...user})
        .then(response => (response_handler(api_response, response)))
        .catch(error => (error_handler(api_response, error)));
    return api_response;
};

export const add_custom_word = (word, token) => {
    return {result:true, message:"All ok"};
};

export const add_global_word = (word, token) => {
    return {result:true, message:"All ok"};
};

export const get_cats = (token) => {
  return {result:true, message:"All ok", data:[{"pk": 1, "name": "Default"}, {"pk": 2, "name": "Greetings"}, {"pk": 3, "name": "New Friends"}]};  
};

export const get_words_by_cat = (cat_id, token) => {
  return {result:true, message:"All ok", data:[
      {
        "id": 1,
        "name": "あいさつ",
        "translation": "Greetings",
        "pronunciation": "Aisatsu",
        "language": 29,
        "translate_language": 13,
        "category_set": [{name:"Greetings"}, {name:"Friends"}, {name:"Blablabla"}]
    },
    {
        "id": 2,
        "name": "おはよう",
        "translation": "good morning",
        "pronunciation": "Ohayō",
        "language": 29,
        "category_set": [{name:"Greetings"}, {name:"Friends"}, {name:"Blablabla"}],
        "translate_language": 13
    },
    {
        "id": 3,
        "name": "おはよう　ございます",
        "translation": "good morning polite",
        "pronunciation": "Ohayōgozaimasu",
        "language": 29,
        "category_set": [{name:"Greetings"}, {name:"Friends"}, {name:"Blablabla"}],
        "translate_language": 13
    }]}; 
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

export const search_word = (word, token) => {
    return {result: true, message:"all ok", data:{
    "global_word_search": false,
    "google_translate_search": true,
    "words": [
        {
            "id": 8,
            "name": "ありがとう",
            "translation": "Thank you",
            "category_set": [{name:"Greetings"}, {name:"Friends"}, {name:"Blablabla"}],
            "pronunciation": "Arigatoo"
        },
        
        {
            "id": 8,
            "name": "ありがとう",
            "translation": "Thank you",
            "category_set": [{name:"Greetings"}, {name:"Friends"}, {name:"Blablabla"}],
            "pronunciation": "Arigatoo"
        },
        
        {
            "id": 8,
            "name": "ありがとう",
            "translation": "Thank you",
            "category_set": [{name:"Greetings"}, {name:"Friends"}, {name:"Blablabla"}],
            "pronunciation": "Arigatoo"
        },
        
        {
            "id": 8,
            "name": "ありがとう",
            "translation": "Thank you",
            "category_set": [{name:"Greetings"}, {name:"Friends"}, {name:"Blablabla"}],
            "pronunciation": "Arigatoo"
        }
    ]
}};
};

export const get_user_words = (token) => {
    return {result: true, message:"all ok", data:[
    {
        "id": 1,
        "category_set": [
            {
                "pk": 2,
                "name": "Greetings"
            }
        ],
        "name": "あいさつ",
        "translation": "Greetings",
        "pronunciation": "Aisatsu",
        "viewed": false,
        "played_match": false,
        "played_reversed_match": false,
        "played_typing": false,
        "played_reversed_typing": false,
        "language": 29,
        "student": 5,
    }, {
        "id": 3,
        "category_set": [
            {
                "pk": 2,
                "name": "Greetings"
            }
        ],
        "name": "おはよう　ございます",
        "translation": "good morning polite",
        "pronunciation": "Ohayōgozaimasu",
        "viewed": false,
        "played_match": false,
        "played_reversed_match": false,
        "played_typing": false,
        "played_reversed_typing": false,
        "language": 29,
        "student": 5,
    }]
           };
};

export const learn_again_word = (pk, token) => {
    return {result:true, message:"All ok"};
};

export const get_learned_words = (token) => {
     return {result: true, message:"all ok", data:[
    {
        "id": 1,
        "category_set": [
            {
                "pk": 2,
                "name": "Greetings"
            }
        ],
        "name": "あいさつ",
        "translation": "Greetings",
        "pronunciation": "Aisatsu",
        "viewed": false,
        "played_match": false,
        "played_reversed_match": false,
        "played_typing": false,
        "played_reversed_typing": false,
        "language": 29,
        "student": 5
    },
    {
        "id": 3,
        "category_set": [
            {
                "pk": 2,
                "name": "Greetings"
            }
        ],
        "name": "おはよう　ございます",
        "translation": "good morning polite",
        "pronunciation": "Ohayōgozaimasu",
        "viewed": false,
        "played_match": false,
        "played_reversed_match": false,
        "played_typing": false,
        "played_reversed_typing": false,
        "language": 29,
        "student": 5
    }]
           };
};