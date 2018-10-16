import React, { Component } from 'react';
import { Jumbotron, Button, } from 'react-bootstrap';

class Entry extends Component {
  render() {
    return (
      <div className="Entry">
        <Jumbotron className="text-center"><h1>Glass Gift</h1></Jumbotron>
        <div className="text-center well" style={{ maxWidth: 500, margin: '70px auto 10px' }}>

          <Button block bsStyle="primary" bsSize="large" onClick={()=> {this.props.history.replace('/login')}}>
              Login
          </Button>
          <br />
          <Button block bsStyle="primary" bsSize="large"  onClick={()=> {this.props.history.replace('/signup')}}>
              Sign Up
          </Button>
        </div>
      </div>
    );
  }
}

export default Entry;