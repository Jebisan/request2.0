import React from 'react';
import { connect } from 'react-redux';
import {firebase} from "../firebase/firebase"
import { startLoginPhone } from '../actions/auth';

export class PhoneNumber extends React.Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: '',
      verificationCode: ''
    };
  }

  componentDidMount() {
    firebase.auth().languageCode = 'da';

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
        onSignInSubmit();
      
      },
      'expired-callback': function() {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    });


  }
  
  onPhoneNumberChange = (e) => {
    const phoneNumber = e.target.value; 
    this.setState(() => ({ phoneNumber }));
  };

  onVerificationCodeChange = (e) => {
    const verificationCode = e.target.value; 
    this.setState(() => ({ verificationCode }));
  };

  getPhoneNumberFromUserInput = () => {
    return this.state.phoneNumber
  };

  getVerificationCodeFromUserInput = () => {
    return this.state.verificationCode
  };


  onSignInSubmit = () => {    
   var phoneNumber = "+45"+this.getPhoneNumberFromUserInput();
   var appVerifier = window.recaptchaVerifier;

   console.log("NUMBER: ", phoneNumber)
   

   firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
       .then(function (confirmationResult) {
         console.log("SMS sent to: ", phoneNumber)
         // SMS sent. Prompt user to type the code from the message, then sign the
         // user in with confirmationResult.confirm(code).
         
         window.confirmationResult = confirmationResult;
       }).catch(function (error) {
         // Error; SMS not sent
         console.log('Error, SMS not sent')
         console.log(error)
         // ...
       });
 }

 onVerifyCode = () => {
  var code = this.getVerificationCodeFromUserInput();
  console.log("VerificationCode: ", code)
  window.confirmationResult.confirm(code).then(function (result) {
    // User signed in successfully.
    var user = result.user;
    
    console.log(user.uid, ' logged in!');
  }).catch(function (error) {
    // User couldn't sign in (bad verification code?)
    // ...
  });
  
 }

  render () {
    return (
     <div>
        <p>hej</p>
        <input type="text" onChange={this.onPhoneNumberChange} /> 
        <button id="sign-in-button" onClick={this.onSignInSubmit}>Get Code!</button>
        <input type="text" onChange={this.onVerificationCodeChange} /> 
        <button onClick={this.onVerifyCode}>Verify!</button>
      </div>
)}


}
const mapDispatchToProps = (dispatch) => ({
  loginPhone: (appVerifier, phoneNumber) => dispatch(startLoginPhone(appVerifier, phoneNumber)),
});

const mapStateToProps = state => {
  return {
    name: state.auth.name,
    uid: state.auth.uid,
    requests: state.requests
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumber);
