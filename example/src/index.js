import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory as createHistory } from 'history';
import { createRouter } from 'redux-url';
import reducer from './reducer';
import App from './App';

const routes = {
    '/': 'HOME',
    '/todos/:id': ({ id }, { status }) => ({ type: 'CHANGE_TODO', payload: { id, status } }),
    '*': 'NOT_FOUND'
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const router = createRouter(routes, createHistory());
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(router),
    )
);

router.sync();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);