import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { search, searchClear } from '../../actions/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Button, ControlLabel, FormControl, FormGroup, PageHeader } from 'react-bootstrap';
import '../Login/Login.css';


class Search extends Component {

constructor(props) {
  super(props);

  this.onSubmit = this.onSubmit.bind(this);
  this.renderNGOList = this.renderNGOList.bind(this);
  this.renderAlert = this.renderAlert.bind(this);

  this.state = {
    type: '',
    keyword: '',
  };
}

onSubmit(e) {
  e.preventDefault();
  console.log(this.state);
  const { type, keyword } = this.state;
  this.props.search(type, keyword)
  .then(() => {
    if (this.props.ngos) {
      this.renderNGOs();
    }
  });
  this.setState({
    type: '',
    keyword: '',
  });
}


componentWillUnmount() {
  this.props.searchClear();
}

renderNGOList() {
  if (!this.props.success || this.props.rows.length === 0) {
    return <p>No NGOs found...</p>;
  }

  return (
    <table className="table table-hover">
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Location</th>
      </tr>
      {this.props.rows.map(ngo => {
        return (
          <tr key={ngo.id}>
            <td>{ngo.name}</td>
            <td>{ngo.description}</td>
            <td>{ngo.location}</td>
          </tr>
        )
      })}
    </table>
  )
}

renderAlert() {
  if (this.props.error) {
    return (
      <Alert bsStyle="danger" onDismiss={this.props.searchClear}>
        <p>{this.props.error}</p>
      </Alert>
    );
  }
  return null;
}

render() {
  return (
    <div className="Search center-block">

    {this.renderAlert()}

     <PageHeader>Search</PageHeader>
      <form onSubmit={this.onSubmit}>
        <FormGroup bsSize="med">
          <ControlLabel>Search: </ControlLabel>
          <FormControl
            type="text"
            placeholder="Type to search for NGOs"
            value={this.state.keyword}
            onChange={(e) => { this.setState({ keyword: e.target.value }) }}
           />
        </FormGroup>

      <br />
        <FormGroup>
       <label style={{ marginRight: 10,}} for="keyword">keyword </label>
       <input style={{ marginRight: 50,}} type="radio" name="basisof" value="keywordword" onChange={(e) => { this.setState({ type: '0' }) }}/>

       <label style={{ marginRight: 10,}} for="Location">Location </label>
       <input style={{ marginRight: 50,}} type="radio" name="basisof" value="Location" onChange={(e) => { this.setState({ type: '1' }) }}/>

       <label style={{ marginRight: 10,}} for="Category">Category </label>
       <input style={{ marginRight: 50,}} type="radio" name="basisof" value="Category" onChange={(e) => { this.setState({ type: '2' }) }}/>
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
     {this.renderNGOList()}
    </div>
  );
}
}

function mapStateToProps({ search }) {
  return {
    pending: search.pending,
    success: search.success,
    error: search.error,
    rows: search.rows,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    search,
    searchClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
