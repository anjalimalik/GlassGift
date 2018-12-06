import React from 'react';
import { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Button, ButtonGroup, } from 'react-bootstrap';
import { getCalData } from '../../actions/getCalData';
import './Profile.css';

class Result extends Component {
    render() {
        var show = {
            display: this.props.visibility ? "block" : "none",
        };
		
        return (
          <div style={ show }>
            <p style={{ color:"orange", fontWeight:"900", fontSize:"16px",}}>
                Results for the period between { this.props.from } to { this.props.to }
            </ p>

            <div style={{ color:"navy", width:"50%", margin: "auto"}}>
                <div className="row">
                    <div className="column1">
                        Number of Donations:
                    </div>
                    <div className="column2">
                        <samp>{this.props.result.numDonations || "0"}</samp>
                    </div>
                </div>
                <div className="row">
                    <div className="column1">
                        Total Amount of Money Donated: 
                    </div>
                    <div className="column2">
                        <samp>{this.props.result.totalMoney || "$0"}</samp>
                    </div>
                </div>
                <div className="row">
                    <div className="column1">
                        Number of Unique Donors:
                    </div>
                    <div className="column2">
                        <samp>{this.props.result.uniqueDonors || "0"}</samp>
                    </div>
                </div>
                <div className="row">
                    <div className="column1">
                        Average Donation Amount:
                    </div>
                    <div className="column2">
                        <samp>{this.props.result.averageDonation || "$0"}</samp>
                    </div>
                </div>
                <div className="row">
                    <div className="column1">
                        Average Age of Donors:
                    </div>
                    <div className="column2">
                        <samp>{this.props.result.averageAge || "--"}</samp>
                    </div>
                </div>
                <br />
            </div>
          </div>
        );
    }
}

class DateRangeStats extends Component {

    constructor(props) {
        super(props);

        this.handleCalendarClick = this.handleCalendarClick.bind(this);
        this.handleEnterClick = this.handleEnterClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.onChangeResultVisibility = this.onChangeResultVisibility.bind(this);

        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            from: undefined,
            to: undefined,
            resultVis: false, 
        };
    }

    static defaultProps = {
        ngoId: 0,
    }

    onChangeResultVisibility(vis) {
        if (vis !== null) {
            this.setState({
                resultVis: vis,
            });
        }
        else {
            this.setState({
                resultVis: !this.state.resultVis,   // toggle
            });
        }
    }

    handleCalendarClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
    }

    handleEnterClick() {
        if (this.state.to !== undefined && this.state.from !== undefined 
            && this.state.from !== null && this.state.to !== null
            && this.state.from <= this.state.to)
        {
            var start = ((this.state.from).toISOString().split('T')[0]);
            var end = ((this.state.to).toISOString().split('T')[0]);
            this.props.getCalData(this.props.ngoId, start, end);
            this.onChangeResultVisibility(true);
        }
        else {
            this.onChangeResultVisibility(false);
        }
    }

    handleResetClick() {
        this.setState(this.getInitialState());
    }

    renderResult() {
        if (this.state.resultVis === true) {
            if (this.props.get.pending) {
                return (
                <FontAwesomeIcon icon="spinner" size="6x" spin />
                );
            }
            else if (this.props.get.error) {
                return (
                    <Alert bsStyle="danger">
                    <p>
                        {this.props.get.error}
                    </p>
                    </Alert>
                );
            }
            return (
                <Result visibility={this.state.resultVis} 
                    result={this.props.get.success}
                    to={(this.state.to).toISOString().split('T')[0]}
                    from={(this.state.from).toISOString().split('T')[0]}>
                </Result> 
            );
        }
    }

    render() {
        const { from, to } = this.state;
        return (
          <div style={{width:'100%', height:'100%', }}>
            <DayPicker
              className="Selectable"
              numberOfMonths={2}
              selectedDays={[from, { from, to }]}
              modifiers={{ start: from, end: to }}
              onDayClick={this.handleCalendarClick}
            />

            < br />
            <ButtonGroup>
                <Button bsStyle="info" onClick={this.handleEnterClick}>Enter</Button>
                <Button bsStyle="danger" onClick={this.handleResetClick}>Reset</Button>
            </ButtonGroup>
            < br /> < br />

            {this.renderResult()}

          </div>
        );
    }
}

function mapStateToProps({ getCalData }) {
    return {
      get: getCalData,
    };
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      getCalData,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (DateRangeStats);