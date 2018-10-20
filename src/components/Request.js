import React from 'react';
import {connect} from 'react-redux';

export class Request extends React.Component {
  constructor() {
    super();
  }

render () {
    return(
    <div>
      <p>
       {this.props.title} - {this.props.artist}
      </p>
   </div>
  )
};
}



const mapStateToProps = (state, props) => ({
  
});


const mapDispatchToProps = (dispatch, props) => ({
 
});

export default connect(mapStateToProps, mapDispatchToProps)(Request); 