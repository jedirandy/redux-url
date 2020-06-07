import React from 'react';
import { connect } from 'react-redux';
import { navigate, goBack, goForward } from 'redux-url';
import Link from './Link';
import { Component } from 'react';

const renderContent = (route) => {
    if (route) {
        if (route.name === 'home')
            return <div>Current: Home</div>;
        if (route.name === 'todos')
            return <div>Current: Todo {route.id}, status: {route.status}</div>;
    }
    return <div>Current: Not Found</div>;
};

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { route, navigate, goBack, goForward } = this.props;
        const HomeLink = (
            <button onClick={() => navigate('/')}>
                <svg className="svg-icon" viewBox="0 0 20 20" width="20">
                    <path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
                </svg>
            </button>
        );

        const Back = (
            <button onClick={() => goBack()}>
                <svg className="svg-icon" viewBox="0 0 20 20" width="20">
                    <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>
                </svg>
            </button>
        );

        const Forward = (
            <button onClick={() => goForward()}>
                <svg className="svg-icon" viewBox="0 0 20 20" width="20">
                    <path d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10"></path>
                </svg>
            </button>
        );

        const createTodo = (id, status) => (
            <div>
                <Link to={`/todos/${id}?status=${status}`}>Todo {id}</Link>
            </div>
        );

        return (
            <div>
                {Back}
                {HomeLink}
                {Forward}
                {createTodo(1, 'active')}
                {createTodo(2, 'active')}
                {createTodo(3, 'done')}
                {renderContent(route)}
            </div>
        );

    }
}

const select = ({ route }) => ({ route });

const actions = dispatch => ({
    navigate: path => dispatch(navigate(path)),
    goBack: () => dispatch(goBack()),
    goForward: () => dispatch(goForward())
});

export default connect(select, actions)(App);