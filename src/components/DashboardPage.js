import React from 'react';
import {connect} from 'react-redux';
import Requests from './Requests';

export class DashboardPage extends React.Component {

  createRequest = () => {
    this.props.history.push('/createrequest');
  }
  render () {
      return (
  <div className="page-container"> 
    <div className="row">
      <div className="col-12 col-md-8 offset-md-2"> 
        <Requests/>
      </div> 
    </div> 
    <div className="row fixed-bottom"> 
      <div className="col-12 text-center"> 
        <button className="btn btn-primary animated bounceIn" onClick = {this.createRequest}>+ RE:QUEST</button>
      </div> 
    </div> 
  </div> 
  )}
}


const mapDispatchToProps = (dispatch) => ({
  //onSubmit: (date) => dispatch(startAddDate(date))
});

const mapStateToProps = state => {
  return {
      request: state.requests
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
