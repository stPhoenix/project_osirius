import axios from 'axios';


//const backend_url = process.env.REACT_APP_BACKEND_URL;
axios.defaults.baseURL =  "http://127.0.0.1:8000/api/v0";

export get_news = async () => {
    let api_response = {result: false, message: "Bad", data: []};
    
    await axios.get("/news/")
        .then((response) => {
        api_response.result = response.status === 200;
        api_response.message = response.statusText;
        api_response.data = response.data;
    })
        .catch(error => {
        api_response.result = false;
        api_response.message = error.statusText;
    });
    return api_response;
};

export const login = (username, password) => {
    console.log("api called");
    const data = {user:get_user("1221dasd123aqsdas").data, token:"1221dasd123aqsdas"};
    return {result:true, data, message:"All ok"};
};

export const logout = (token) => {
    return {result:true, message:"All ok"};
};

export const sign_up = (username, email, password, learn_language, home_language, first_name) => {
    const data = {user:get_user("1221dasd123aqsdas").data, token:"1221dasd123aqsdas"};
	return {result:true, message:"All ok", data};
};

export const change_password = (password1, password2, token) => {
    return {result:true, message:"All ok"};
};

export const get_user = (token) => {
    return {result:true, message:"All ok", data:{
    "pk": 5,
    "username": "bohdan",
    "email": "bohdan@mail.com",
    "first_name": "Bohdan",
    "language_set": [
        {
            "name": "Japanese",
            "slug": "ja"
        },
        {
        "name": "Afrikaans",
        "slug": "af"
        },
        {
        "name": "Albanian",
        "slug": "sq"
        },
        {
        "name": "Arabic",
        "slug": "ar"
        }
    ],
    "current_language": "Japanese"
    }}
};

export const update_user = (user, token) => { 
    return {result:true, message:"All ok", data:{user, token}};
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

export const get_langs = (token) => {
    return {result:true, message:"All ok", data:[{
        "name": "Afrikaans",
        "slug": "af"
    },
    {
        "name": "Albanian",
        "slug": "sq"
    },
    {
        "name": "Arabic",
        "slug": "ar"
    },
    {
        "name": "Belarusian",
        "slug": "be"
    }]};
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