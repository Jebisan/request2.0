import React from 'react';
import {connect} from 'react-redux';
import { startAddLike } from '../actions/like';

export class Request extends React.Component {
  constructor() {
    super();
    this.state = {
      like: undefined
    };
  }



like = () => {
  if(this.state.like==false){
    console.log("You like this song again!")
    this.setState({
      like: true
   });
  
  } else if (this.state.like==true){
    console.log("You don't like this anymore!")
    this.setState({
      like: false
  });
  
} 
else if(this.state.like == undefined) {
  console.log("You like this song now!")
  this.setState({
     like: true
  })
}
const likeObject = {
  likedSongId: this.props.id, 
  userId: this.props.name
}

this.props.onLike(likeObject);
}

dislike = () => {
  if(this.state.like==false){
    console.log("You dislike this song again :(")
    this.setState({
      like: true
   });
  
  } else if (this.state.like==true){
    console.log("You don't dislike this anymore!")
    this.setState({
      like: false
  });
  
} 
else if(this.state.like == undefined) {
  console.log("You dislike this song now!")
  this.setState({
     like: true
  })
 
}
}



render () {
    return(
    <div>
      <p>
       {this.props.title} - {this.props.artist}
       <button onClick={this.like}>LIKE</button>
       <button onClick={this.dislike}>DISLIKE</button>
      </p>
   </div>
  )
};
}



const mapDispatchToProps = (dispatch) => ({
  onLike: (likeObject) => dispatch(startAddLike(likeObject))
});

const mapStateToProps = state => {
  return {
      name: state.auth.name
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(Request);