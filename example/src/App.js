import Inferno from 'inferno';
import { connect } from 'inferno-redux';
import { push } from 'redux-simple-router';

const App = ({ route, push }) =>
{
    const HomeLink = <a href="/" onClick={e => {
        e.preventDefault();
        push('/');
    }}>Home</a>

    if (route && route.name === 'home')
        return (
            <div>
                {HomeLink}
            </div>
        )
    if (route && route.name === 'todos')
        return <div>Todo {route.id}</div>
    return (
        <div>
            { HomeLink }
            <p>Not found</p>
        </div>
    )
}
const select = ({
    route
}) => ({
    route
});

const actions = dispatch => ({
    push: path => dispatch(push(path))
})

export default connect(select, actions)(App)