import React, { Component } from 'react';
import Router from 'next/router';
import AuthService from '../services/AuthService';
import { Button } from 'antd';
import Page from '../layouts/main';
import cookies from 'next-cookies';

export default function markProtected(AuthComponent) {
  
  return class Protected extends Component {

    authService = null;

    constructor(props) {
      super(props);
      this.authService = new AuthService(props.token);
    }

    static async getInitialProps(ctx) {
      if (ctx.req) {
        const cookie = cookies(ctx);
        return cookie ? { token: cookie.token } : {};
      } 
      return { token: AuthService.getAuth() };
    }

    componentDidMount() {
      if (!this.authService.loggedIn()) {
        Router.push('/login');
      }
    }

    async logout() {
      await this.authService.logout();
      Router.push('/');
    }

    render() {
      return (
        <Page>
          <AuthComponent {...this.props} />
          <Button onClick={() => this.logout()}>Logout</Button>
        </Page>
      );
    }

  }
}