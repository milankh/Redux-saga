import React from 'react';
import './index.css';
import Counter from './components/Counter';
import { render } from 'react-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux'
import reducer from './reducers/reducer'
import Posts from './components/Posts';

const store = createStore(reducer);

const App = () => (
     <Provider store={store}>
        <Counter />
        <Posts />
    </Provider >
);

render( 
    <App />
    ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
