import React, { Component } from "react";
import { connect } from 'react-redux';
import { startAddRequest } from '../actions/requests'

export class CreateRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      artist: '',
      isTitleInvalid: false, 
      isArtistInvalid: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const requestObject = {
      title: this.state.title,
      artist: this.state.artist,
      likes: []
    }
  
    if (this.state.title && this.state.artist) {
      this.setState(() => ({ isTitleInvalid: false, isArtistInvalid: false }));
      this.props.startAddRequest(requestObject);
      this.props.history.push('/');
    } else {
      if (!this.state.title) {
        this.setState(() => ({ isTitleInvalid: true }));
      } else if (this.state.title) {
        this.setState(() => ({ isTitleInvalid: false }));
      }
      
      if (!this.state.artist) {
        this.setState(() => ({ isArtistInvalid: true }));
      } else if (this.state.artist) {
        this.setState(() => ({ isArtistInvalid: false }));
      }
    }
  };

  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title, isTitleInvalid: false }));
  };

  onArtistChange = (e) => {
    const artist = e.target.value;
    this.setState(() => ({ artist, isArtistInvalid: false }));
  };

  render() {
    return (
      <div className="page-container">
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3">
            <h1>RE:QUEST</h1>
            <p>Add a song to the party playlist!</p>
            <form className="animated fadeInUp" onSubmit={this.onSubmit}>
              <div className="song-title-input"> 
                <small>Song title</small>
                <input 
                  className={this.state.isTitleInvalid ? 'form-control has-error' : 'form-control'} 
                  onChange={this.onTitleChange}/>
                <p className={this.state.isTitleInvalid ? 'has-error' : 'd-none'}>Please enter a song title</p> 
              </div>    
              
              <div className="artist-name-input">           
              <small>Artist(s)</small>
              <input
                className={this.state.isArtistInvalid ? 'form-control has-error' : 'form-control'} 
                onChange={this.onArtistChange}/>
              <p className={this.state.isArtistInvalid ? 'has-error' : 'd-none'}>Please enter an artist name</p> 
              </div> 
            </form>
          </div>
        </div>
        <div className="row fixed-bottom">
          <div className="col-12 text-center">
            <button onClick={this.onSubmit} className="btn btn-primary">ADD SONG</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = (dispatch) => ({
  startAddRequest: (request) => dispatch(startAddRequest(request))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest);