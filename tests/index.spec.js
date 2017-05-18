import { createRouter, navigate, goBack, goForward, go } from '../src/';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';

describe('tests', () => {
    const routes = {
        '/': 'HOME',
        '/todos/:id': ({ id }) => ({ type: 'CHANGE_TODO', payload: parseInt(id) }),
        '/user/:id': 'CHANGE_USER',
        '*': 'NOT_FOUND'
    };

    const reducer = (state = {}, action) => {
        switch (action.type) {
            case 'HOME': 
                return {
                    page: 'HOME',
                    query: action.payload.query
                };
            case 'CHANGE_TODO':
                return {
                    page: 'TODO',
                    id: action.payload
                };
            case 'CHANGE_USER':
                return {
                    page: 'USER',
                    ...action.payload
                };
            case 'NOT_FOUND':
                return {
                    page: 'NOT_FOUND',
                    url: action.payload.params._
                };
            default:
                return state;
        }
    };

    let store;
    let history;
    beforeEach(() => {
        history = createMemoryHistory();
        const router = createRouter(routes, history);
        store = createStore(
            reducer,
            applyMiddleware(router)
        );
    });

    it('navigate()', () => {
        store.dispatch(navigate('/todos/123'));
        expect(store.getState()).to.deep.equal({
            page: 'TODO',
            id: 123
        });
    });

    it('navigate() with replace option on does not push a new state', () => {
        expect(history.entries).to.have.length(1);
        store.dispatch(navigate('/todos/123', true));
        expect(history.entries).to.have.length(1);
    });

    it('goBack()', () => {
        history.push('/1');
        expect(history.index).to.equal(1);
        store.dispatch(goBack());
        expect(history.index).to.equal(0);
    });

    it('goForward()', () => {
        history.push('/1');
        expect(history.index).to.equal(1);
        history.go(-1);
        store.dispatch(goForward());
        expect(history.index).to.equal(1);
    });

    it('go()', () => {
        history.push('/1');
        history.push('/2');
        history.push('/3');
        store.dispatch(go(-3));
        expect(history.index).to.equal(0);
        store.dispatch(go(2));
        expect(history.index).to.equal(2);
    });

    it('parses queries', () => {
        store.dispatch(navigate('/?last=10'));
        expect(store.getState()).to.deep.equal({
            page: 'HOME',
            query: {
                last: '10'
            }
        });
    });

    it('parses queries', () => {
        store.dispatch(navigate('/user/123?detail=true'));
        expect(store.getState()).to.deep.equal({
            page: 'USER',
            params: { id: '123' },
            query: { detail: 'true' },
            path: '/user/123?detail=true'
        });
    });
});