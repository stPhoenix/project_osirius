import axios from 'axios';


//export const get_langs = async () => {
//    let api_response = {result: false, message: "Bad", data: []};
//    await axios.get("/langs/", {headers:{AUTHORIZATION:`TOKEN ${token}`}})
//    .then((response) => (response_handler(api_response, response)))
//    .catch((error) => (error_handler(api_response, error)));
//    return api_response;
//};
//axios.defaults.baseURL =  "http://127.0.0.1:8000/api/v0";
axios.defaults.baseURL =  process.env.REACT_APP_BACKEND_URL;

const error_handler = (api_response, error) => {
        api_response.result = false;
        if (error.response){
            api_response.message = JSON.stringify(error.response.data).replace("\"", "").replace("{", "").replace("}", "").replace("[", "").replace("]", "").replace("'", "");
        }else{
            api_response.message = "Oops! Something went wrong..."
            console.log(error)
        }
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
    await axios.get("/auth/user/", {headers:{AUTHORIZATION:`TOKEN ${token}`}})
        .then(response => (user=response.data))
        .catch(error => (user=undefined));
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
    await axios.get(`/cats/${cat_id}/words/`, {headers: {AUTHORIZATION:`TOKEN ${token}`}})
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

export const get_learn_word = async (token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.get("/play/learn/", {headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
  
};

export const set_learn_word = async (pk, learned, token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.post("/play/learn/", {pk, learned}, {headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
};

export const play_matching = async (reverse, token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.get("/play/matching/", {headers: {AUTHORIZATION:`TOKEN ${token}`}, params:{reverse}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
};

export const result_play_matching = async (word, answer, reverse, token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.post("/play/matching/", {word, answer, reverse}, {headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
};

export const play_typing = async (reverse, token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.get("/play/typing/", {headers: {AUTHORIZATION:`TOKEN ${token}`}, params:{reverse}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
};

export const result_play_typing = async (reverse, word_pk, answer, token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.post("/play/typing/", {reverse, word: word_pk, answer}, {headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
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
    let api_response = {result: false, message: "Bad", data: []};
    await axios.delete(`/user/words/${word_pk}/`, {"pk": word_pk, headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
}

export const learn_again_word = async (pk, token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.post(`/user/words/${pk}/learn_again/`, {}, {headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;

};

export const get_learned_words = async (token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.get("/user/words/learned/", {headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
};

export const delete_user = async (pk, token) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.delete(`/user/delete/${pk}/`, {"pk": pk, headers: {AUTHORIZATION:`TOKEN ${token}`}})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;

};

export const send_feedback = async (p_name, email, p_text) => {
    let api_response = {result: false, message: "Bad", data: []};
    await axios.post(`/feedback/`, {name: p_name, email, text: p_text})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;

};