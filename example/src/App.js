import { connect } from 'inferno-redux';
import { navigate, goBack, goForward } from 'redux-simple-router';

const Content = (route) => {
    if (route) {
        if (route.name === 'home')
            return <div>Home</div>;
        if (route.name === 'todos')
            return <div>Todo {route.id}</div>;
    }
    return <div>Not Found</div>;
};

const App = ({ route, navigate, goBack, goForward }) =>
{
    const HomeLink = <a href="/" onClick={ e => {
        e.preventDefault();
        navigate('/');
    }}>Home</a>;

    const Back = <a href="/" onClick={ e => {
        e.preventDefault();
        goBack();
    }}>Back</a>;

    const Forward = <a href="/" onClick={ e => {
        e.preventDefault();
        goForward();
    }}>Forward</a>;

    return (
        <div>
            { Back }
            { HomeLink }
            { Forward }
            { Content(route) }
        </div>
    );
};
const select = ({
    route
}) => ({
    route
});

const actions = dispatch => ({
    navigate: path => dispatch(navigate(path)),
    goBack: () => dispatch(goBack()),
    goForward: () => dispatch(goForward())
});

export default connect(select, actions)(App);