import React, { Component } from 'react';
import Router from 'next/router';
import AuthService from '../services/AuthService';
import { Button } from 'antd';
import Page from '../layouts/main';
import cookies from 'next-cookies';
const jwtDecode = require('jwt-decode');

export default function markProtected(AuthComponent) {
  
  return class Protected extends Component {

    authService = null;

    constructor(props) {
      super(props);
      this.authService = new AuthService(props.token);
    }

    static async getInitialProps(ctx) {
      let token = null;
      let profile = null;
      if (ctx.req) {
        // run in server side
        const cookie = cookies(ctx);
        token = cookie ? cookie.token : '';
      } else {
        // run in client side
        token = AuthService.getAuth();
      }
      if (token) {
        try {
          profile = jwtDecode(token);
        } catch (e) {
          console.error('ERROR_PROFILE_PARSE', e)
        }
      }
      return { token, profile };
    }

    componentDidMount() {
      if (!this.authService.loggedIn() || !this.props.profile) {
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
          <header className="pa3 f6 shadow-1">
            <span>Welcome back!</span>
            <span className="fr">
              {this.props.profile && this.props.profile.login}
              <a className="pl3" onClick={() => this.logout()}>Logout</a>
            </span>
          </header>
          <AuthComponent {...this.props} authService={this.authService} />
        </Page>
      );
    }

  }
}