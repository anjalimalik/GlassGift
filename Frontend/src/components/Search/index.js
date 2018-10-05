import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { search, searchClear } from '../../actions/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ControlLabel, FormControl, FormGroup, PageHeader } from 'react-bootstrap';
import '../Login/Login.css';


class Search extends Component {

constructor(props) {
  super(props);
    
  this.onSubmit = this.onSubmit.bind(this);
    
  this.state = {
    BasisOf: '',
    Key: '',
  };
}

onSubmit(e) {
  e.preventDefault();
  const { basisOf, keyword } = this.state;
  this.props.search(basisOf, keyword)
  .then(() => {
    if (this.props.ngos) {
      this.renderNGOs();
    }
  });
  this.setState({
    BasisOf: '',
    Key: '',
  });
}


componentWillUnmount() {
  this.props.searchClear();
}

renderNGOList() {
  if(!this.props.ngos) {
    return (<p>Loading data..</p>);
  }
  const {ngosList} = this.props.ngos;  // WORKS?????
  /* Display data here */
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th></th>
        </tr>
      </thead>
      <tbody>{ngosList.map((ngo) => <tr key={ngo}><td>{ngo}</td></tr>)}</tbody>
    </table>
  );
}

renderNGOs() { // BETTER REPRESENTATION?????
    return (
        <div >
          {this.renderNGOList()} 
            })}
            })}
        </div >
    );
}

render() {
  return (
    <div className="Search center-block">

     <PageHeader>Search</PageHeader>

     {}

      <form onSubmit={this.onSubmit}>
        <FormGroup bsSize="med">
          <ControlLabel>Search: </ControlLabel>
          <FormControl
            type="text"
            placeholder="Type to search for NGOs"
            value={this.state.Key}
            onChange={(e) => { this.setState({ Key: e.target.value }) }}
           />
        </FormGroup>

      <br />
        <FormGroup>
       <label style={{ marginRight: 10,}} for="Keyword">Keyword </label>
       <input style={{ marginRight: 50,}} type="radio" name="basisof" value="Keyword" onChange={(e) => { this.setState({ BasisOf: '0' }) }}/> 
       
       <label style={{ marginRight: 10,}} for="Location">Location </label>
       <input style={{ marginRight: 50,}} type="radio" name="basisof" value="Location" onChange={(e) => { this.setState({ BasisOf: '1' }) }}/> 
       
       <label style={{ marginRight: 10,}} for="Category">Category </label>
       <input style={{ marginRight: 50,}} type="radio" name="basisof" value="Category" onChange={(e) => { this.setState({ BasisOf: '2' }) }}/>     
       </FormGroup>

        <Button
          block
          bsSize="large"
          type="submit"
          bsStyle="primary"
         disabled={this.props.pending}
       >
         Search
         { this.props.pending ? <span className="loginButtonSpinner">
           <FontAwesomeIcon icon="spinner" size="1x" spin/></span> : null }
       </Button>
     </form>
    </div>
  );
}
}

function mapStateToProps(state) {
  return {
    //pending: search.pending,
    //success: search.success,
    //error: search.error,
    ngos: state.data // WORKS?????
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    search,
    searchClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);