export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
})
export const LoginStart = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})
export const LoginStart = (err) => ({
    type: "LOGIN_FAILURE",
    payload: err
})