import React,{ Component } from 'react';
import {Line as LineChart} from 'react-chartjs-2';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function chartData() {
  return {
    labels: ['Software Programmer', 'Software Tester', 'Team Lead', 'Team Architect', 'Solution Architect', 'Analyst', 'Consultant'],
    datasets: [
      {
        label: 'San Jose',
        lineTension: 0.1,
        backgroundColor: 'rgba(0, 177, 228,0.7)',
        borderColor: 'rgba(0, 177, 228,0.7)', // The main line color
        borderCapStyle: 'square',
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "black",
        pointHoverBorderColor: "brown",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        datasetFill: false,
        pointHitRadius: 10,
        datasetStroke: false,
        fill: false,
        data: [5, 9, 8, 1, 6, 5, 4],
      },
      {
        label: 'San Fransisco',
        lineTension: 0.1,
        backgroundColor: 'rgba(0, 177, 228,0.7)',
        borderColor: 'rgba(255, 99, 132, 0.6)', // The main line color
        borderCapStyle: 'square',
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "black",
        pointHoverBorderColor: "brown",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        datasetFill: false,
        fill: false,
        datasetStroke: false,
        data: [2, 8, 0, 1, 8, 7, 9],
      },
    ]
  }
}

// const options = {
//   scaleShowGridLines: false,
//   // scaleGridLineColor: 'rgba(0, 177, 228,0.7)',
//   scaleGridLineWidth: 1,
//   scaleShowHorizontalLines: false,
//   scaleShowVerticalLines: false,
//   bezierCurve: false,
//   bezierCurveTension: 0.4,
//   pointDot: false,
//   pointDotRadius: 4,
//   pointDotStrokeWidth: 1,
//   pointHitDetectionRadius: 20,
//   datasetStroke: false,
//   datasetStrokeWidth: 2,
//   datasetFill: false,
//   legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
// }

const styles = {
  graphContainer: {
    border: '1px solid white',
    padding: '15px'
  }
}

class LineChartExample extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: chartData()
    }
  }

  render() {
    return (
      <div style={styles.graphContainer}>
        <LineChart data={this.state.data}
          // options={options}
          width="600" height="250"/>
      </div>
    )
  }
}
export default connect(null,null)(LineChartExample);
