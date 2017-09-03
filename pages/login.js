import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Page from '../layouts/main';
import { Input, Button } from 'antd';
import AuthService from '../services/AuthService';

const auth = new AuthService();

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login() {
    auth.login(this.state.username, this.state.password)
      .then(res => {
        console.log('login response', res);
        Router.push('/board'); 
      })
      .catch(e => console.error(e));
  }

  render() {
    return (
      <Page>
        <h1>
          Login
      </h1>
        <div className="tc w-40">
          <Input type="text" name="username" onChange={e => this.handleChange(e)} placeholder="Login name" />
          <Input type="password" name="password" onChange={e => this.handleChange(e)} placeholder="Enter your password" />
        </div>
        <div className="">
          <Button type="primary" onClick={() => this.login()}>Login</Button>
        </div>
      </Page>
    );
  }

}