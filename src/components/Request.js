import React from 'react';
import {connect} from 'react-redux';

const Request = ({...request}) => {
  return (
   <div>
      <p> {request.title} - {request.artist}</p>
     </div>
   );
}

export default connect()(Request); 