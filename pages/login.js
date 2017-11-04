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
    this.state = { username: 'hellosamlify', password: 'password' };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async login() {
    await auth.login(this.state.username, this.state.password);
    Router.push('/board'); 
  }

  render() {
    const { username, password } = this.state;
    return (
      <Page>
        <div className="tc mt5">
          <h1 className="mb5">Login</h1>
          <div className="w-20 center">
            <Input className="mb2" value={username} type="text" name="username" onChange={e => this.handleChange(e)} placeholder="Login name (hellosamlify)" />
            <Input className="mb4" value={password} type="password" name="password" onChange={e => this.handleChange(e)} placeholder="Enter your password (password)" />
          </div>
          <div className="">
            <Button type="primary" onClick={() => this.login()}>Login</Button>
          </div>
        </div>
      </Page>
    );
  }

}