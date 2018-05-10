import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './components/AppComponent';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {rootReducers} from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const store = createStore(rootReducers, applyMiddleware(logger));

console.log(store.getState());

ReactDOM.render(<Provider store={store}>
                    <BrowserRouter>
                        <AppComponent />
                    </BrowserRouter>
                </Provider>
                , document.getElementById('root'));
registerServiceWorker();
