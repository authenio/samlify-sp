/* This page is a protected page */

import React, { Component } from 'react';
import Link from 'next/link';
import markProtected from '../components/protected';

class Board extends Component {

  static async getInitialProps(ctx) {
    console.log('---- server side rendering');
  }

  constructor(props) {
    super(props);
    console.log('board page constructor');
  }

  render() {
    return  (
      <div>
        <h2>
          Welcome you back!
        </h2>
        <div>
          <Link href="/sp"><a>Configure my service provider</a></Link>
        </div>
      </div>
    );
  }
}

export default markProtected(Board);