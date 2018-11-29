import React from 'react';
import {Component} from "react";
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class Result extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var show = {
			display: this.props.visibility ? "block" : "none"
		};
		
        return (
          <div >
              <h2 style={ show }>{ this.props.result }HIIIIII</ h2>
          </div>
        );
    }
}

class DateRangeStats extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.onChangeResultVisibility = this.onChangeResultVisibility.bind(this);

        this.state = {
            range:  {   
                        from: undefined,
                        to: undefined,
                    },  
            resultVis: null, 
            resultData: [],
        }
    }

    static defaultProps = {

    }

    onChangeResultVisibility() {
        if (this.state.resultVis == null) {
            this.setState({
                resultVis: true,   // first click
            });
        }
        else {
            this.setState({
                resultVis: !this.state.resultVis,   // toggle
            });
        }
    }

    handleClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);

        if (this.state.to !== undefined) {
            // get data
            //-------> CALL API ROUTE here
            // show stats
            
        }
        if (this.state.to !== undefined && this.state.from !== undefined 
            && this.state.from !== null && this.state.to !== null
            && this.state.from <= this.state.to)
        {
            console.log("here: " + (this.state.to).toDateString() + (this.state.from).toDateString());
            this.onChangeResultVisibility();
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
              onDayClick={this.handleClick}
            />

            < br />
            
            <Result visibility={this.state.resultVis} 
                    result={this.state.resultData}>
            </Result> 

          </div>
        );
    }
}

export default DateRangeStats;