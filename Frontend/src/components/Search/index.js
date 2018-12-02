import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { search, searchClear } from '../../actions/search';
import { getSearches, getSearchesClear } from '../../actions/getSearches';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Alert, Button, FormGroup, PageHeader, ButtonToolbar, ToggleButtonGroup, ToggleButton,
  Table
} from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import { NGO_CATEGORIES } from '../../constants';
import '../Login/Login.css';
import './Search.css';
import './Autosuggest.css';

const getSuggestionValue = suggestion => suggestion.text;
const renderSuggestion = suggestion => (
  <Button bsStyle="link">
    {suggestion.text}
  </Button>
);

class Search extends Component {

constructor(props) {
  super(props);

  this.getSuggestions = this.getSuggestions.bind(this);
  this.onOptionChange = this.onOptionChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
  this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  this.renderNGOList = this.renderNGOList.bind(this);
  this.renderAlert = this.renderAlert.bind(this);

  this.state = {
    type: 0,
    keyword: '',
    suggestions: [],
  };
}

getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : this.props.getSearchesSuccess.filter(search =>
    search.text.toLowerCase().slice(0, inputLength) === inputValue
  );
}

onOptionChange(event, { newValue }) {
  this.setState({
    keyword: newValue
  });
}

onSuggestionsFetchRequested({ value }) {
  this.setState({
    suggestions: this.getSuggestions(value)
  });
};

onSuggestionsClearRequested(){
  this.setState({
    suggestions: []
  });
};

onSubmit(e) {
  e.preventDefault();
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

componentDidMount() {
  this.props.getSearches();
}

componentWillUnmount() {
  this.props.searchClear();
  this.props.getSearchesClear();
}

renderNGOList() {
  if (!this.props.success && !this.props.error && !this.props.pending) return null;

  if (!this.props.success || this.props.rows.length === 0) {
    return <p>No NGOs found...</p>;
  }

  return (
    <Table striped bordered hover>
      <thead className="header">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Location</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {this.props.rows.map(ngo =>
          <tr key={ngo.id} onClick={() => this.props.history.push(`/profile/${ngo.id}`)}>
            <td>{ngo.username}</td>
            <td>{ngo.description}</td>
            <td>{ngo.location}</td>
            <td>{NGO_CATEGORIES[ngo.category]}</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
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
  const { keyword, suggestions } = this.state;
  const inputProps = {
    placeholder: 'Search for an NGO...',
    value: keyword,
    onChange: this.onOptionChange
  };
  return (
    <div className="Search center-block text-center" style={{width:'70%'}}>

    {this.renderAlert()}

     <PageHeader>Search</PageHeader>
      <form onSubmit={this.onSubmit}>
        <FormGroup bsSize="lg">

        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        </FormGroup>

        <div style={{paddingBottom: '20px'}}>
          <ButtonToolbar>
            <ToggleButtonGroup type="radio" name="searchType" defaultValue={0}
            onChange={type => this.setState({ type })}
            >
              <ToggleButton value={0}>Keyword</ToggleButton>
              <ToggleButton value={1}>Location</ToggleButton>
              <ToggleButton value={2}>Category</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </div>

        <div style={{ marginBottom: '15px'}}>
          <Button
            block
            bsSize="large"
            type="submit"
            bsStyle="info"
           disabled={this.props.pending}
         >
           Search
           { this.props.pending ? <span className="loginButtonSpinner">
             <FontAwesomeIcon icon="spinner" size="1x" spin/></span> : null }
         </Button>
       </div>
       <hr />
     </form>

     <div style={{paddingTop: '20px'}}>
      {this.renderNGOList()}
     </div>

    </div>
  );
}
}

function mapStateToProps({ search, getSearches }) {
  return {
    pending: search.pending,
    success: search.success,
    error: search.error,
    rows: search.rows,
    getSearchesPending: getSearches.pending,
    getSearchesSuccess: getSearches.success,
    getSearchesError: getSearches.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    search,
    searchClear,
    getSearches,
    getSearchesClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));
