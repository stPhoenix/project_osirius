let keys_counter = 0;

export const alert = (state={visible:true, alerts:[]}, action) => {
    switch(action.type) {
        case "TOGGLE_ALERT":
            const visible = !state.visible;
            return {...state, visible};
            
        case "DELETE_ALERT":
            const alerts = state.alerts.filter((alert) => (alert.key !== action.key));
            return {...state, alerts};
            
        case "ADD_ALERT":
            const key = "alert_"+keys_counter;
            keys_counter++;
            let a = {...action.alert, key};
            const als = [...state.alerts, a];
            return {...state, alerts:als};
            
        default:
            return state;
    }
};