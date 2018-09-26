import React, { Component } from 'react';
import { Button, PageHeader } from 'react-bootstrap';
import NGOEdit from '../Profile/NGOEdit';

class App extends Component {

  constructor(props) {
    super(props);

    this.onChangeNGOEditModalVisibility = this.onChangeNGOEditModalVisibility.bind(this);

    this.state = {
      ngoEditModalVis: false,
    };
  }

  onChangeNGOEditModalVisibility(vis) {
    this.setState({ngoEditModalVis: vis});
  }

  render() {
    return (
      <div className="App">
        <PageHeader>Glass Gift</PageHeader>
        <Button onClick={() => this.setState({ngoEditModalVis: true})}>Test</Button>
        <NGOEdit visibility={this.state.ngoEditModalVis} onChangeVisibility={this.onChangeNGOEditModalVisibility}/>
      </div>
    );
  }
}

export default App;
