import React, { Component } from 'react';
import { Link } from 'react-router';
import REVISION from '../utils/revision';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>Home</h2>
          <Link to="/todo">to Todo</Link>
          <br />
          Revision is {REVISION}
        </div>
      </div>
    );
  }
}
