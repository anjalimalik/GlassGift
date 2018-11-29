import React from 'react';
import {Component} from "react";
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Button, ButtonGroup, } from 'react-bootstrap';

class Result extends Component {
    render() {
        var show = {
            display: this.props.visibility ? "block" : "none",
            color: "orange",
		};
		
        return (
          <div >
            <h4 style={ show }>{ this.props.result }
                  Results for the period between { this.props.from } to { this.props.to }
            </ h4>
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
            resultData: [],
        };
    }

    static defaultProps = {
        ngoName: 'NGO',
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
            // get data
            //-------> CALL API ROUTE here
            // show stats
            console.log("here: " + (this.state.to).toDateString() + (this.state.from).toDateString());
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
              <h4>Pick a Date Range to get donations statistics for <span style={{color:'blue',}}>{this.props.ngoName}</span>.</h4>
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
            < br />

            {(() => {
                if (this.state.resultVis === true){
                    return (
                    <Result visibility={this.state.resultVis} 
                        result={this.state.resultData}
                        to={(this.state.to).toDateString()}
                        from={(this.state.from).toDateString()}>
                    </Result> 
                    )
                }
            })()}

          </div>
        );
    }
}

export default DateRangeStats;