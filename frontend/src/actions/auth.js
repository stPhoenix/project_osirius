import Cookies from 'universal-cookie';
import {get_user} from '../api';


const cookie = new Cookies();

export const login = (token, user) => {
    
    cookie.set('Token', token);
    return{
            type: "LOGIN",
            token,
            user,
}};

export const logout = () => {
    cookie.remove('Token');
    return {
            type: "LOGOUT",
}};

export const check_token = (dispatch, isAuthenticated) => {
    const token = cookie.get('Token');
    if (token !== undefined && !isAuthenticated) {
        get_user(token)
            .then((user) => {
            if (user !== undefined) {
                dispatch(login(token, user));
            };
        });
    }
};