// @flow
import UrlPattern from 'url-pattern';
import type {
    Store,
    Routes,
    RouterAction,
    Next,
    Action
} from './types';

const routerType = '@@redux-simple-router';

const createRouter = (routes: Routes, history: any) => {
    const patterns = Object.keys(routes).reduce((result, route) => ({
        ...result,
        [route]: { 
            pattern: new UrlPattern(route),
            mapper: routes[route]
        }
    }), {});
    let _store;
    const middleware = (store: Store) => {
        _store = store;
        return (next: Next) => (action: RouterAction) => {
            if (action.type === routerType) {
                action.method && history[action.method].call(null, action.path);
                if (action.shouldDispatch)
                    for (let p of Object.keys(patterns)) {
                        const { pattern, mapper } = patterns[p];
                        const matched = pattern.match(action.path);
                        if (matched) {
                            return next(
                                typeof mapper === 'function' ?
                                mapper(matched) :
                                {
                                    type: mapper,
                                    payload: matched
                                }
                            );
                        }
                    }
            }
            return next(action);
        };
    };

    const reload = () => _store.dispatch(replace(location.pathname));

    history.listen((_, method: string) => method === 'POP' && reload());

    return middleware;
};

const createMethod =
(method: string, shouldDispatch: boolean = true) =>
(path: string | number | typeof undefined): Action =>
({
    path,
    method,
    shouldDispatch,
    type: routerType,
});

const push = createMethod('push');
const replace = createMethod('replace');
const go = createMethod('go', false);
const goBack = createMethod('goBack', false);
const goForward = createMethod('goForward', false);
const navigate = (url: string, isReplacing: boolean = false) =>
    isReplacing ? replace(url) : push(url);

export {
    createRouter,
    push,
    replace,
    navigate,
    goBack,
    go,
    goForward
};