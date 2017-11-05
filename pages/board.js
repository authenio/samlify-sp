/* This page is a protected page */

import React, { Component } from 'react';
import Link from 'next/link';
import markProtected from '../components/protected';

class Board extends Component {

  static async getInitialProps(ctx) {
    console.log(`---- won't run there because it's invoked in parent's one`);
    console.log('---- unless invoke ComposedComponent.getInitialProps');
  }

  constructor(props) {
    super(props);
    console.log('board page constructor', props);
  }

  render() {
    return  (
      <div>
        <div className="ma3 tc center w-50">
          In this protected page, you can configure your service provider and the associated identity providers. To keep it simple and easy, we will store all the information in local storage, so it's highly recommended that not to include the secret key used in any dev/staging/production environment, in other words, it is only for testing purpose.
        </div>
      </div>
    );
  }
}

export default markProtected(Board);