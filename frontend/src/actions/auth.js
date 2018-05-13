export const login = (token, user) => ({
   type: "LOGIN",
   token,
   user,
});

export const logout = () => ({
    type: "LOGOUT",
});