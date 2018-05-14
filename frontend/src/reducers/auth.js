export const auth = (state={isAuthenticated:false, user:{username:"NonRegistered"}}, action) => {
    switch(action.type) {
        case "LOGIN":
            return {isAuthenticated: true, token: action.token, user: action.user};
        case "LOGOUT":
            return {isAuthenticated:false, token:null, user:{username:"NonRegistered"}}
        default:
            return state;
    }
};