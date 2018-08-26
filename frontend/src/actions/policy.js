import Cookies from 'universal-cookie';


const cookie = new Cookies();

export const check_policy = () => {
    const policy = cookie.get('Policy');
    return policy === undefined;
};

export const set_policy = () => {
    cookie.set('Policy', true);
};