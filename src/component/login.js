import React, { useState, useEffect } from 'react';
import './styles-login.css';
import App from '../App';
import LoginForm from './loginform';
import Greeting from '../index';
import { render } from '@testing-library/react';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoggedIn: false };
	}

	render() {
		const isLoggedIn = this.state.isLoggedIn;
		// console.log(this.state);
		if (!isLoggedIn) {
			return <LoginForm isLoggedIn={false} />;
		} else {
			return <App />;
		}
	}
}

export default Login;