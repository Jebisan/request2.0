import React, { Component } from "react";
import  {connect} from 'react-redux';
import {startAddRequest} from '../actions/requests'


export class CreateRequest extends Component {

  constructor(props) {
    super(props);
  
  this.state = {
    title: '',
    artist: ''
};
  }

  onSubmit = (e) => {
    e.preventDefault();   
    const requestObject = {
        title: this.state.title,
        artist: this.state.artist
    }
    if(this.state.title && this.state.artist){
    this.props.startAddRequest(requestObject); 
    this.props.history.push('/');
  } else {
    alert("Please enter both a title and a artist!");
  }
  };

  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => (
          {
            title
          }));
        };

        onArtistChange = (e) => {
          const artist = e.target.value;
          this.setState(() => (
                {
                  artist
                }));
              };

  render() {
    return (
      <div >
        <h2>Create request</h2> 
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder = 'Title' onChange = {this.onTitleChange}/> 
          {<br></br>}
          <input type="text" placeholder = 'Artist' onChange = {this.onArtistChange}/>
          {<br></br>}
          <button>ADD SONG</button>
        </form> 
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
    
  });
  
  const mapDispatchToProps = (dispatch) => ({
      startAddRequest: (request) => dispatch(startAddRequest(request))
  });
  
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest);