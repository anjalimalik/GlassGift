import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {search} from '../../actions/search';

class Search extends Component {
  render() {
    const {search, value} = this.props;

    return (
        <input
          className="form-control"
          placeholder = "Procurar Trabalho"
          onChange={(e) => this.props.search(e.target.value)}
          value={value} 
          />
    );
  }
} 

function mapStateToProps({ngos}) {
  return {value: ngos.value};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({search}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);