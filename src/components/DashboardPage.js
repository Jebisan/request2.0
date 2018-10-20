import React from 'react';
import {connect} from 'react-redux';
import Requests from './Requests';

export class DashboardPage extends React.Component {

  createRequest = () => {
    this.props.history.push('/createrequest');
  }
  render () {
      return (
  <div >
      <Requests/>
      <button onClick = {this.createRequest}>+RE:QUEST</button>
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
