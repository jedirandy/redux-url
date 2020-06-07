import React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'redux-url';

const Link = ({
    to,
    replace = false,
    navigate,
    children
}) => (
    <a href={to} onClick={ e => {
        e.preventDefault();
        navigate(to, replace);
    }}>{children}</a>
)

const actions = dispatch => ({
    navigate: path => dispatch(navigate(path))
});

export default connect(null, actions)(Link);