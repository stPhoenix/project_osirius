import {combineReducers} from 'redux';
import {auth} from './auth';

export const rootReducers = combineReducers({auth: auth});