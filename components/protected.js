import React, { Component } from 'react';
import Router from 'next/router';
import AuthService from '../services/AuthService';
import { Button } from 'antd';
import Page from '../layouts/main';

export default function markProtected(AuthComponent) {
  
  const auth = new AuthService();

  return class Protected extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      };
    }

    componentDidMount() {
      if (!auth.loggedIn()) {
        // TODO add flash message for unauthorized access
        Router.push('/');
      }
      this.setState({ isLoading: false });
    }

    logout() {
      auth.logout().then(res => {
        Router.push('/');
      });
    }

    render() {
      const isLoading = this.state.isLoading;
      return (
        <Page>
          { 
            isLoading ? 
            <div>Loading...</div> :
            <AuthComponent {...this.props} auth={auth} />
          }
          <Button onClick={() => this.logout()}>Logout</Button>
        </Page>
      );
    }

  }
}