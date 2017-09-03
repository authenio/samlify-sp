/* This page is a protected page */

import React, { Component } from 'react';
import markProtected from '../components/protected';

class Board extends Component {
  render() {
    return  (
      <div>
        This is my application
      </div>
    );
  }
}

export default markProtected(Board);