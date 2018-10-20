import React from 'react';
import {connect} from 'react-redux';
import { startAddLike, startRemoveLike } from '../actions/like';

export class Request extends React.Component {
  constructor() {
    super();
    this.state = {
      like: undefined
    };
  }



like = () => {
  if(this.state.like===false){
    console.log("You like this song again!")
    this.setState({
      like: true
   });
  
  } else if (this.state.like===true){
    console.log("You don't like this anymore!")
    this.setState({
      like: false
  });
  this.props.onRemoveLike(this.props.id);
  
} 
else if(this.state.like === undefined) {
  console.log("You like this song now!")
  this.setState({
     like: true
  })
}
const likeObject = {
  likedSongId: this.props.id, 
  uid: this.props.uid,
  name: this.props.name
}
//console.log("UID"+this.props.uid);

this.props.onLike(likeObject);
}

dislike = () => {
  const likeData = {
    requestId: this.props.id,
    uid: this.props.uid
  }
  this.props.onRemoveLike(likeData);
 console.log("Trying to remove all likes on " + this.props.id);
  
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
  onLike: (likeObject) => dispatch(startAddLike(likeObject)),
  onRemoveLike: (likeObject) => dispatch(startRemoveLike(likeObject))
});

const mapStateToProps = state => {
  return {
      name: state.auth.name,
      uid: state.auth.uid
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(Request);