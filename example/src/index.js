import Inferno, { render } from 'inferno';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'inferno-redux';
import createHistory from 'history/createBrowserHistory';
import { createRouter } from 'redux-simple-router';
import reducer from './reducer';
import App from './App';

const routes = {
    '/': 'HOME',
    '/todos/:id': ({ id }) => ({ type: 'CHANGE_TODO', payload: id }),
    '*': 'NOT_FOUND'
};

const router = createRouter(routes, createHistory());
const store = createStore(
    reducer,
    applyMiddleware(router)
);

router.init();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);