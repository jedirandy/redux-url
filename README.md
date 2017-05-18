# redux-url

[![Build Status](https://travis-ci.org/jedirandy/redux-url.svg?branch=master)](https://travis-ci.org/jedirandy/redux-url)
[![npm module](https://badge.fury.io/js/redux-url.svg)](https://www.npmjs.org/package/redux-url)

A redux middleware for synchronizing the url with your redux store's state. It provides a set of action creators for changing the url, and if the url matches a user-defined route, an action will be dispatched, provided with information such as parameters and query.

## Install

```
npm install --save redux-url
```

Note that [`history`](https://github.com/ReactTraining/history) is needed for it to work correctly.

## Usage

```javascript
import createHistory from 'history/createBrowserHistory'; // choose a history implementation
import { createStore, applyMiddleware } from 'redux';
import { createRouter, navigate } from 'redux-url';

const routes = {
    '/': 'HOME', // when url is matched, will dispatch an action of type 'HOME', the payload contains matched params and query
    '/todos/:id': ({ id }, query) => ({ type: 'CHANGE_TODO', payload: id, query }), // you can also pass a function to transform the action, the matched params, query and the original path will be passed in
    '*': 'NOT_FOUND'
};

const router = createRouter(routes, createHistory());
const store = createStore(
    reducer,
    applyMiddleware(router)
);

store.dispatch(navigate(location.pathname, true)); // In order to restore the state from the URL when refreshed

store.dispatch(navigate('/todos/123')); // navigate to '/todos/123'
```

## API

* `createRouter(routes, history)`:

  creates the middleware
  - arguments
    * routes (*object*) : The URL patterns to be mapped, where values can be either of the following:
      * *string*:

        when the URL matches the route, an action will be dispatched of which the type is the given string, and the payload has the following shape:

      ```javascript
        {
          type: string,
          payload: {
            params: Object,
            query: Object,
            path: string
          }
        }
      ```

      * *function*: (object, object, string) => Action

        a function that takes the matched `params`, `query` and the original `path`, returns an action

    * history: the history object created from lib [`history`](https://github.com/ReactTraining/history),
    such as `createBrowserHistory`

  - returns

    the middleware

* `navigate(path: string, replace: boolean = false)`:

  creates an action for navigating to the path, `replace` indicates whether it should modify the current history entry rather than push a new one

* `push(path: string)`:

  a shorthand of navigate(path, false)

* `replace(path, string)`:

  a shorthand of navigate(path, true)

* `goBack()`:

  creates an action for going back

* `goForward()`:

  creates an action for going forward

* `go(n: number)`:

  creates an action for going n (can be negative) steps
