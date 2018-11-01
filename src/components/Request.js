  import React from 'react';
  import {connect} from 'react-redux';
  import { startAddLike, startRemoveLike} from '../actions/like';
  import {startAddDislike, startRemoveDislike} from '../actions/dislike';
  
  export class Request extends React.Component {
    constructor() {
      super();
      this.state = {
        like: undefined,
        dislike: undefined,
        numberOfLikes: 0,
        numberOfDislikes: 0
      };
    }


  componentDidMount(){
//HENTER ALLE LIKES
    if(this.getLikeObject().id===this.props.id){
      this.setState(() => ({ numberOfLikes:this.getLikeObject().likes.length }))
      //console.log('WHAT: ', this.getLikeObject().likes);
    }

    //HVIS JEG ALLEREDE HAR LIKED, SET NUMBER_OF_LIKES +1
    let objlikes = [];
    this.props.likes.forEach(element => {
      if(element.likedSongId===this.props.id)
      objlikes = element.likes;
    });
    for(const key in objlikes) {
      if(objlikes.hasOwnProperty(key)) {
          var value = objlikes[key];
            if(Object.values(value)[0]===this.props.uid){
              this.setState(() => ({like: true}))
            }
          }    
  }

  //HENTER ALLE DISLIKES
  if(this.getDislikeObject().id===this.props.id){
    this.setState(() => ({ numberOfDislikes:this.getDislikeObject().dislikes.length }))
  }

  let objdislikes = [];
  this.props.dislikes.forEach(element => {
    if(element.dislikedSongId===this.props.id)
    objdislikes = element.dislikes;
  });
  for(const key in objdislikes) {
    if(objdislikes.hasOwnProperty(key)) {
        var value = objdislikes[key];
          if(Object.values(value)[0]===this.props.uid){   
            this.setState(() => ({dislike: true}))
          }
        }    
  }
}

getLikeObject = () => {
  for (const request of this.props.requests) {
    if (request.id === this.props.id) {
    return request
    }}
}

getDislikeObject = () => {
  for (const request of this.props.requests) {
    if (request.id === this.props.id) {
    return request
    }}
}

  likeHandler = () => {
    if(this.state.like!==true){
      const likeObject = {
        uid: this.props.uid,
        name: this.props.name
      }

      this.setState(() => ({like: true}), () => {
        this.props.onLike(this.props.id,likeObject);
      //console.log("Liked!", this.props.id);
      });
      this.setState((prevState) => ({ numberOfLikes: prevState.numberOfLikes + 1 }))

  if(this.state.dislike===true){
      const dislikeData = {
        dislikedSongId:this.props.id, 
        dislikeId:this.findMe2(this.props.id,this.props.dislikes)
      }
      this.setState(() => ({dislike: false}), () => {
        this.props.onRemoveDislike(dislikeData);
        //console.log("not disliked!");
    });
    this.setState((prevState) => ({ numberOfDislikes: prevState.numberOfDislikes -1}))
  }
    }  else if (this.state.like===true){
      const likeData = { 
        likedSongId:this.props.id, 
        likeId:this.findMe2(this.props.id, this.props.likes)
      } 
      this.setState(() => ({like: false}), () => {
        this.props.onRemoveLike(likeData);
        //console.log("not liked!");
    });
  this.setState((prevState) => ({ numberOfLikes: prevState.numberOfLikes -1}))
  }
  }


  dislikeHandler = () => {  
    if(this.state.dislike!==true){
      const dislikeObject = {
        uid: this.props.uid,
        name: this.props.name
      }
  
      this.setState(() => ({dislike: true}), () => {
        this.props.onDislike(this.props.id,dislikeObject);
        console.log("disliked!");
        });
        this.setState((prevState) => ({ numberOfDislikes: prevState.numberOfDislikes +1}))

        if(this.state.like===true){
        const likeData = { 
          likedSongId:this.props.id, 
          likeId:this.findMe2(this.props.id,this.props.likes)
        } 
        this.setState(() => ({like: false}), () => {
          this.props.onRemoveLike(likeData);
          console.log("not liked!");
      });
      this.setState((prevState) => ({ numberOfLikes: prevState.numberOfLikes -1}))
      
    }
    }  else if (this.state.dislike===true){
      const dislikeData = { 
        dislikedSongId:this.props.id, 
        dislikeId:this.findMe2(this.props.id,this.props.dislikes)
      } 
      this.setState(() => ({dislike: false}), () => {
        this.props.onRemoveDislike(dislikeData);
        console.log("not disliked!");
    });
    this.setState((prevState) => ({ numberOfDislikes: prevState.numberOfDislikes -1}))
    }
  }

  findMe2 = (id, list) => {
    let likes = [];
    let foundLikeId = '';
    for (const request of list) {
    
      if (request.likedSongId === id) {
      likes = request.likes
      }}
      likes.forEach(element => {
        if(Object.values(element)[0]===this.props.uid)
        {
          foundLikeId=Object.keys(element)[0];

        }
      });
      return foundLikeId
  }

  getState = () => {
    console.log(this.state);
  }

  render () {
  
  
      return(
        <React.Fragment>
          <tr> 
            <td>
              <h3 className="song-title">{this.props.title}</h3>
              <p className="artist-name">{this.props.artist}</p> 
            </td>
            <td className="vote-column">  
            <p>{this.state.numberOfDislikes}</p>
              <button className="vote-btn dislike" onClick={this.dislikeHandler}>
                <i className="material-icons" style={ this.state.dislike? {color: 'red'} : null}>thumb_down</i>
              </button>
            </td>
            <td className="vote-column">
            <p>{this.state.numberOfLikes}</p>
              <button className="vote-btn like" onClick={this.likeHandler}>
                <i className="material-icons"  style={ this.state.like? {color: 'green'} : null}>thumb_up</i> 
              </button>
            </td>
          </tr> 
        </React.Fragment>
    )
  };

  }



  const mapDispatchToProps = (dispatch) => ({
    onLike: (id, likeObject) => dispatch(startAddLike(id, likeObject)),
    onRemoveLike: (likeObject) => dispatch(startRemoveLike(likeObject)),
    onDislike: (id, dislikeObject) => dispatch(startAddDislike(id, dislikeObject)),
    onRemoveDislike: (dislikeObject) => dispatch(startRemoveDislike(dislikeObject))
  });

  const mapStateToProps = state => {
    return {
        name: state.auth.name,
        uid: state.auth.uid,
        requests: state.requests,
        likes: state.likes,
        dislikes: state.dislikes
    };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Request);