export const toggle_alert = () => ({
   type: "TOGGLE_ALERT",
});

export const delete_alert = (key) => ({
    type: "DELETE_ALERT",
    key: key
});

export const add_alert = (alert={color:"primary", text:"Loading"}) => ({
    type: "ADD_ALERT",
    alert: alert
});