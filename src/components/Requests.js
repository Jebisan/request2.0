import React from "react";
import {connect} from 'react-redux';
import Request from './Request';
import {startSetRequests} from '../actions/requests';

export class Requests extends React.Component {
  constructor(props) {
    super(props); 
  }
    render () {
      return (
         <div>
         <h2>Songs</h2>
         {
            this.props.requests.map((request) => 
              <Request 
              key = {request.id} 
              title = {request.title}
              artist = {request.artist}/>
            )
            }

      </div>
      );
  };
}

const mapStateToProps = (state, props) => ({
  requests: state.requests,
});


export default connect(mapStateToProps)(Requests);
