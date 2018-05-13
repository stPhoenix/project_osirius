import {combineReducers} from 'redux';
import {auth} from './auth';
import {alert} from './alert'

export const rootReducers = combineReducers({auth: auth, alert: alert});