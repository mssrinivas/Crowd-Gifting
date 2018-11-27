import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './applicantprofile.css';
import LineChart from './../graph/line_chart';
import BarChart from './../graph/barchart';
import Navbar from './../navbar/Navbar.jsx';
import {userSearch} from './../../api/Api';

class RecruiterDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state={
      map:''
    }
    this.userAnalysisData = {
      Job_id:['1234','44456','55566','555559','999999','111111','23567898'],
      Applicant_id: ['6','5','4','7','8','3','2']
    }
     this.graphData1 = [{
        Job_id: "12345",
        JobTitle : "Software Programmer",
        Applicant_id: "123"
    },
  {
        Job_id: "12345",
        JobTitle : "Software Programmer",
        Applicant_id: "123"
  },
{
        Job_id:"123456",
        JobTitle : "Software Programmer",
        Applicant_id: "123"
},
  {
      Job_id: "123456",
      JobTitle : "Team Lead",
      Applicant_id: "123"
  },
{
      Job_id: "123456",
      JobTitle : "Team Lead",
      Applicant_id: "1234"
},
{
      Job_id:"123456",
      JobTitle : "Team Lead",
      Applicant_id: "12345"
},
{
    Job_id:"123457",
    JobTitle: "Analyst",
    Applicant_id: "123456"
},
{
    Job_id:"123457",
    JobTitle: "Analyst",
    Applicant_id: "123456"
},
{
    Job_id:"123457",
    JobTitle: "Analyst",
    Applicant_id: "123456"
},
{
    Job_id:"123457",
    JobTitle: "Software Designer",
    Applicant_id: "123456"
},
{
    Job_id:"1234578",
    JobTitle: "Software Designer",
    Applicant_id: "123456"
},
{
    Job_id:"123459",
    JobTitle: "Software Designer",
    Applicant_id: "123456"
},
{
    Job_id:"123459",
    JobTitle: "Senior Software Engineer",
    Applicant_id: "123456"
},
{
    Job_id:"123459",
    JobTitle: "Senior Software Engineer",
    Applicant_id: "123456"
},
{
    Job_id:"123459",
    JobTitle: "Senior Software Engineer",
    Applicant_id: "123456"
},
{
    Job_id:"123459",
    JobTitle: "Software Engineer",
    Applicant_id: "123456"
},
{
    Job_id:"123459",
     JobTitle: "Software Engineer",
    Applicant_id: "123456"
},
{
    Job_id:"123459",
    JobTitle: "Software Engineer",
    Applicant_id: "123456"
},
{
    Job_id:"123450",
     JobTitle: "Software Engineer",
    Applicant_id: "123456"
},

];
    this.clickSearch=this.clickSearch.bind(this);
  }
  parseMonth(data) {
    switch (data) {
        case '1':
          return 'Jan';
          break;
        case '2':
          return 'Feb';
          break;
        case '3':
          return 'Mar';
          break;
        case '4':
          return 'Apr';
          break;
        case '5':
          return 'May';
          break;
        case '6':
          return 'Jun';
          break;
        case '7':
          return 'Jul';
          break;
        case '8':
            return 'Aug';
            break;
        case '9':
            return 'Sep';
            break;
        case '10':
            return 'Oct';
            break;
        case '11':
            return 'Nov';
            break;
        case '12':
            return 'Dec';
            break;
        default:
          alert("Wrong date entered")
        }
  }
  parseData() {
      var graphData = new Array();

      // var graphData1 = this.props.userTraceActivity;
      for(var i = 0 ; i< this.graphData1.length ; i++) {
        // var currentDate = graphData1[i].Job_id;
        // var month = currentDate.split('-')[1];
        // var monthString= this.parseMonth(month);
        var data = {};
        // var myDate=currentDate.split('-')[2].split('T')[0];
        data.date=this.graphData1[i].Job_id;
        data.applicant_id=this.graphData1[i].Applicant_id;
        graphData.push(data);

      }
    this.state.map = new Map();
    var count=1;
    for(var i = 0 ; i < graphData.length;i++) {
        if(this.state.map.has(graphData[i].date)) {
           count = this.state.map.get(graphData[i].date);
           count++;
        }
        else {
          count=1;
        }
        this.state.map.set(graphData[i].date,count);
    }
  }
  getAdminDashBoardGraph(map,label_name, header_text){
    var labels = new Array();
    var datasets = new Array();
    this.state.map[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
    }

    for (let [key, value] of this.state.map) {
        console.log(key + ' ' + value);
    }
    var count=1;

    for(const m of this.state.map.entries()) {
      var val = m.toString();
      alert(val.split(',')[0]);
      for(var i = 0 ; i<this.graphData1.length;i++) {
        if(val.split(',')[0] == this.graphData1[i].Job_id) {
          // alert(this.graphData1[i].Job_id);
          labels.push(this.graphData1[i].JobTitle);
          break;
        }
      }
      // labels.push(val.split(',')[0]);
      datasets.push(val.split(',')[1]);
      count++;
      if(count > 5)
       break;
    }
    if(map.size >0){
        var data={
          labels: labels,
          datasets:datasets,
          labelName:label_name,
          header_text:header_text
         }
      return (<BarChart data={data}/>)
    }else{
      return (<h2 style={{color:"red"}}> Analysis data not available </h2>)
    }
}

clickSearch =(e) => {
  e.preventDefault();
  this.props.userSearch();
}
  render() {
    return (
            <div>
              <Navbar />
                <div className="header-graph">
                <h5 > Who viewed your profile </h5>
                <div className="graph-display">
                  <div className='bg-light-orange dib br1 pa1 ma1 bw1 shadow-1'>
                      <h5 className="profile-visitors"> {}Top 5 job posting with less number of applications</h5>
                      <div className="car-graph-3">
                      {this.parseData()}
                      {this.getAdminDashBoardGraph(this.state.map,
                      "Applications"," Top 5 job posting with less number of applications")}
                      </div>

                  </div>
                </div>
                </div>
            </div>
           );
  }
}

//
// function mapStateToProps(state) {
//     return {
//         userTraceActivity: state.LoginReducer.userTraceActivity,
//     };
//
// }
// function matchDispatchToProps(dispatch){
//     console.log("Dispatch",dispatch);
//     return bindActionCreators({userSearch: userSearch}, dispatch);
// }

export default connect(null,null)(RecruiterDashBoard);
