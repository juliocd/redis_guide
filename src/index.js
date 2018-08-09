import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '/Users/juliocesardiaz/Work/Practice/reactjs/react-complete-guide/src/containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App title="Relevant Persons" />, document.getElementById('root'));
registerServiceWorker();
