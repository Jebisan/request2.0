import React from 'react';
import { connect } from 'react-redux';
import { startLoginGoogle, startLoginFacebook } from '../actions/auth';

export const LoginPage = ({ startLoginGoogle,startLoginFacebook  }) => (
  <div className="container login-container">
    <div className="row"> 
      <div className="col-12" align="center"> 
        <div className="logo-container"> 
          <img className="logo" src="/images/logo.jpg"></img>
        </div> 

        <button className="login-btn" onClick={startLoginGoogle}> 
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
            <span>Sign in with Google</span>
        </button>

        <button className="login-btn" onClick={startLoginFacebook}> 
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg"/>
          <span>Sign in with Facebook</span>
      </button>


      </div> 
    </div> 
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLoginGoogle: () => dispatch(startLoginGoogle()),
  startLoginFacebook: () => dispatch(startLoginFacebook())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
