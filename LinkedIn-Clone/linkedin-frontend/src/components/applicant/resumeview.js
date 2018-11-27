import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {history} from "../../util/utils";
class ResumeView extends Component {

    constructor(props){
        super(props)
        this.state = {
            fileName : this.props.currentUserDetails.resume_path,
            numPages: null,
            pageNumber: 1
        }
        this.onDocumentLoad = this.onDocumentLoad.bind(this);

    }

    componentDidMount(){
        console.log(this.props.currentUserDetails.resume_path);
    }


        onDocumentLoad = ({ numPages }) => {
            this.setState({ numPages });
          }

    render() {
        const {fileName,pageNumber,numPages} = this.state;
        const fileURL = this.props.currentUserDetails.resume_path;
        return (

        <div>
            <Document
          file={this.props.currentUserDetails.resume_path}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
        <button onClick ={() => {history.push('./userprofile')}} className="btn btn-primary bookingsuccess1"><strong>Return to User Profile</strong></button>
        </div>
         );
    }
}

function mapStateToProps(state) {
  console.log("State",state);
    return {
       currentUser: state.LoginReducer.current_user,
       currentUserDetails: state.LoginReducer.currentUserDetails
    };
}


export default connect(mapStateToProps,null)(ResumeView);
