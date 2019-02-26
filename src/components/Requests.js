import React from "react";
import { connect } from 'react-redux';
import Request from './Request';
import orderRequests from '../selectors/requests';

export class Requests extends React.Component {
  constructor() {
    super();
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
                  artist={request.artist}
                  likes={request.likes}
                  dislikes={request.dislikes}
                  createdBy={request.createdBy}
                  />
              )
            }
            <tr><td><p>&nbsp;</p><p>&nbsp;</p></td></tr>
          </tbody>
        </table>
      }
      
    }
    return jsx;
}

}
const mapStateToProps = state => {
  return {
      requests: orderRequests(state.requests)
}
};


export default connect(mapStateToProps)(Requests);