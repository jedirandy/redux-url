# Redux simple router

A redux middleware that does one simple job: matches a route and dispatch an action.

## Usage

```javascript
import createHistory from 'history/createBrowserHistory'; // choose a history implementation
import { createStore, applyMiddleware } from 'redux';
import { createRouter, navigate } from 'redux-simple-router';

const routes = {
    '/': 'HOME', // when url is matched, will dispatch an action of type home, payload is the matched result
    '/todos/:id': ({ id }) => ({ type: 'CHANGE_TODO', payload: id }), // you can also pass a function to custom the action, the matched result will be passed in
    '*': 'NOT_FOUND'
};

const router = createRouter(routes, createHistory());
const store = createStore(
    reducer,
    applyMiddleware(router)
);

store.dispatch(navigate(location.pathname)); // for it to work when refreshed

store.dispatch(navigate('/todos/123')); // change route
```
