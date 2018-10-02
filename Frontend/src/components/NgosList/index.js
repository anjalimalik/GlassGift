import React, { Component } from 'react';
import { connect } from 'react-redux';

class NgosList extends Component {
  render() {
    const {ngos} = this.props;

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>None</th>
          </tr>
        </thead>
        <tbody>{ngos.map((ngo) => <tr key={ngo}><td>{ngo}</td></tr>)}</tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    ngos: state.ngos
  }
}

export default connect(mapStateToProps)(NgosList);