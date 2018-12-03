import React from 'react';
import {Component} from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Button, ButtonGroup, } from 'react-bootstrap';
import { getCalData } from '../../actions/getCalData';

class Result extends Component {
    render() {
        var show = {
            display: this.props.visibility ? "block" : "none",
		};
		
        return (
          <div >
            <h5 style={ show }>{ this.props.result }
                  Results for the period between { this.props.from } to { this.props.to }
            </ h5>
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
            resultData: {},
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
            this.setState({resultData: this.props.getCalData.success,});
            this.onChangeResultVisibility(true);
        }
        else {
            this.onChangeResultVisibility(false);
        }
    }

    handleResetClick() {
        this.setState(this.getInitialState());
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

            {(() => {
                if (this.state.resultVis === true){
                    return (
                    <Result visibility={this.state.resultVis} 
                        result={this.state.resultData}
                        to={(this.state.to).toISOString().split('T')[0]}
                        from={(this.state.from).toISOString().split('T')[0]}>
                    </Result> 
                    )
                }
            })()}

          </div>
        );
    }
}

function mapStateToProps({ getCalData }) {
    return {
      getCalData: getCalData,
    };
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      getCalData,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (DateRangeStats);