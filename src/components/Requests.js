import React from "react";
import { connect } from 'react-redux';
import Request from './Request';
import database from '../firebase/firebase';
import {addRequest } from '../actions/requests';

export class Requests extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let jsx = <p>Loading..</p>;
    if (this.props.requests.length > 0) {
      {
        jsx = <table className="table">
          <tbody>
            {
              this.props.requests.map((request) =>
                <Request
                  key={request.id}
                  id={request.id}
                  title={request.title}
                  artist={request.artist}/>
              )
            }
          </tbody>
        </table>
      }
    }
    return jsx;
}}
const mapStateToProps = (state, props) => ({
  requests: state.requests
});


export default connect(mapStateToProps)(Requests);