# redux-url

[![Build Status](https://travis-ci.org/jedirandy/redux-url.svg?branch=master)](https://travis-ci.org/jedirandy/redux-url)
[![npm module](https://badge.fury.io/js/redux-url.svg)](https://www.npmjs.org/package/redux-url)

A redux middleware that does one simple job: matches a url pattern and dispatch an action.

## Install

```
npm install redux-url
```

[`history`](https://github.com/ReactTraining/history) is needed for it to work correctly.

## Usage

```javascript
import createHistory from 'history/createBrowserHistory'; // choose a history implementation
import { createStore, applyMiddleware } from 'redux';
import { createRouter, navigate } from 'redux-url';

const routes = {
    '/': 'HOME', // when url is matched, will dispatch an action of type 'HOME', the payload is the matched result
    '/todos/:id': ({ id }) => ({ type: 'CHANGE_TODO', payload: id }), // you can also pass a function to custom the action, the matched result will be passed in
    '*': 'NOT_FOUND'
};

const router = createRouter(routes, createHistory());
const store = createStore(
    reducer,
    applyMiddleware(router)
);

store.dispatch(navigate(location.pathname, false)); // for state to be restored from URL when refreshed

store.dispatch(navigate('/todos/123')); // navigate to '/todos/123'
```

## API

* `createRouter(routes, history)`:

  creates the middleware
  - arguments
    * routes (*object*) : URL patterns to be mapped, where values can be:
      * string: when matched, an action will be dispatched of which the is the given string, the payload will be the matched result

      * function: a function that takes the matched result and returns a

    * history: the history object created from lib [`history`](https://github.com/ReactTraining/history),
    such as `createBrowserHistory`

  - returns

    the middleware

* `navigate(path: string, replace: *boolean* = false)`:

  creates an action for going to the path, `replace` indicates whether it should modify the current history entry rather than push a new one

* `goBack()`:

  creates an action for going back

* `goForward()`:

  creates an action for going forward

* `go(n)`:

  creates an action for going n (can be negative) steps
