import React, { Component } from 'react';
import { Pie, } from 'react-chartjs-2';

class PieChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
        }
    }

    static defaultProps = {
        title: "",
    }

    render(){
        return (
        <div className="pieChart">
            <Pie
            data={this.state.data}
            options={{
                title: {
                    display: true,
                    text: this.props.title,
                    fontSize:25
                },
            }}
            />
        </div>
        )
    }
}


export default PieChart;
