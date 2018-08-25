import React from 'react';
import ReactDOM from 'react-dom';
import {AppComponent} from './components';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {rootReducers} from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollMain from './containers/ScrollMain';

let logger;
if (process.env.NODE_ENV === 'development') {
    console.log("Test env "+process.env.REACT_APP_TEST_ENV);
    logger = store => next => action => {
        console.group(action.type)
        console.info('dispatching', action)
        let result = next(action)
        console.log('next state', store.getState())
        console.groupEnd(action.type)
        return result
    }
}

const store = createStore(rootReducers, applyMiddleware(logger));

ReactDOM.render(<Provider store={store}>
                    <BrowserRouter>
						<ScrollMain>
                        <AppComponent />
						</ScrollMain>
                    </BrowserRouter>
                </Provider>
                , document.getElementById('root'));
registerServiceWorker();
