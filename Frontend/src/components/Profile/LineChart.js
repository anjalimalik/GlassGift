import React, { Component } from 'react';
import { Line, } from 'react-chartjs-2';

class LineChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
        }
    }

    static defaultProps = {
        title: "",
    }

    render(){
        return (
        <div>
            <Line
                data={this.state.data}
                options={{
                    title: {
                        display: true,
                        text: this.props.title,
                        fontSize:25
                    },
                    legend:{},
                }}
            />
        </div>
        )
    }
}


export default LineChart;
