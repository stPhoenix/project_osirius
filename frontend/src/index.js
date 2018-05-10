import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/AppComponent';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<AppComponent />, document.getElementById('root'));
registerServiceWorker();
