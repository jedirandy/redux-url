import { render } from 'inferno';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'inferno-redux';
import createHistory from 'history/createBrowserHistory';
import { createRouter } from 'redux-url';
import reducer from './reducer';
import App from './App';

const routes = {
    '/': 'HOME',
    '/todos/:id': ({ id }) => ({ type: 'CHANGE_TODO', payload: id }),
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