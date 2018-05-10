export const login = (token) => ({
   type: "LOGIN",
   token,
});

export const logout = () => ({
    type: "LOGOUT",
});

export const storeUser = (user) => ({
    type: "STORE_USER",
    user,
});