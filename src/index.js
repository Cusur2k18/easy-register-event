import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'unstated';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider>
      <Router>
        <App />
      </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
