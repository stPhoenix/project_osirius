export const auth = (state={isAuthenticated:true, user:{username:"NonRegistered"}}, action) => {
    switch(action.type) {
        case "STORE_USER":
            return {...state, user: action.user};
        case "LOGIN":
            return {isAuthenticated: true, token: action.token};
        case "LOGOUT":
        default:
            return state;
    }
}