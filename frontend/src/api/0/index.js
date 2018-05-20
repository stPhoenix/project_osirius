export const get_news = () => {
    const news = [{title: "title", pub_date:"1.1.1111", text:"If the URL is /about, then <About>, <User>, and <NoMatch> will all render because they all match the path. This is by design, allowing us to compose <Route>s into our apps in many ways, like sidebars and breadcrumbs, bootstrap tabs, etc."},
                 {title: "title", pub_date:"1.1.1111", text:"If the URL is /about, then <About>, <User>, and <NoMatch> will all render because they all match the path. This is by design, allowing us to compose <Route>s into our apps in many ways, like sidebars and breadcrumbs, bootstrap tabs, etc."},
                 {title: "title", pub_date:"1.1.1111", text:"If the URL is /about, then <About>, <User>, and <NoMatch> will all render because they all match the path. This is by design, allowing us to compose <Route>s into our apps in many ways, like sidebars and breadcrumbs, bootstrap tabs, etc."},
                 {title: "title", pub_date:"1.1.1111", text:"If the URL is /about, then <About>, <User>, and <NoMatch> will all render because they all match the path. This is by design, allowing us to compose <Route>s into our apps in many ways, like sidebars and breadcrumbs, bootstrap tabs, etc."},
                 {title: "title", pub_date:"1.1.1111", text:"If the URL is /about, then <About>, <User>, and <NoMatch> will all render because they all match the path. This is by design, allowing us to compose <Route>s into our apps in many ways, like sidebars and breadcrumbs, bootstrap tabs, etc."},
                 {title: "title", pub_date:"1.1.1111", text:"If the URL is /about, then <About>, <User>, and <NoMatch> will all render because they all match the path. This is by design, allowing us to compose <Route>s into our apps in many ways, like sidebars and breadcrumbs, bootstrap tabs, etc."}];
    return {result:true, message:"All ok", data:news};  
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
        "category": [{name:"Greetings"}, {name:"Friends"}, {name:"Blablabla"}]
    },
    {
        "id": 2,
        "name": "おはよう",
        "translation": "good morning",
        "pronunciation": "Ohayō",
        "language": 29,
        "category": [{name:"Greetings"}, {name:"Friends"}, {name:"Blablabla"}],
        "translate_language": 13
    },
    {
        "id": 3,
        "name": "おはよう　ございます",
        "translation": "good morning polite",
        "pronunciation": "Ohayōgozaimasu",
        "language": 29,
        "category": [{name:"Greetings"}, {name:"Friends"}, {name:"Blablabla"}],
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

export const play_typing = (token) => {
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

export const result_play_typing = (word_pk, token) => {
  return {result:true, message:"All ok"};  
};

export const search_word = (word, token) => {
    return {result: true, message:"all ok", data:{
    "global_word_search": true,
    "google_translate_search": false,
    "words": [
        {
            "id": 8,
            "name": "ありがとう",
            "translation": "Thank you",
            "category": [{name:"Greetings"}, {name:"Friends"}, {name:"Blablabla"}],
            "pronunciation": "Arigatoo"
        },
        
        {
            "id": 8,
            "name": "ありがとう",
            "translation": "Thank you",
            "category": [{name:"Greetings"}, {name:"Friends"}, {name:"Blablabla"}],
            "pronunciation": "Arigatoo"
        },
        
        {
            "id": 8,
            "name": "ありがとう",
            "translation": "Thank you",
            "category": [{name:"Greetings"}, {name:"Friends"}, {name:"Blablabla"}],
            "pronunciation": "Arigatoo"
        },
        
        {
            "id": 8,
            "name": "ありがとう",
            "translation": "Thank you",
            "category": [{name:"Greetings"}, {name:"Friends"}, {name:"Blablabla"}],
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