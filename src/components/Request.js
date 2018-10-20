import React from 'react';
import {connect} from 'react-redux';
import { startAddLike, startRemoveLike, startAddDislike, startRemoveDislike} from '../actions/like';

export class Request extends React.Component {
  constructor() {
    super();
    this.state = {
      like: undefined,
      dislike: undefined
    };
  }



like = () => {
  if(this.state.like !==true) {
const likeObject = {
  likedSongId: this.props.id, 
  uid: this.props.uid,
  name: this.props.name
}
this.props.onLike(likeObject);
this.setState({ like: true })
} else if (this.state.like === true) {
  const likeData = {
    requestId: this.props.id,
    likeId: this.findMe(this.props.id, this.props.likes)
  }
this.props.onRemoveLike(likeData);
this.setState({ like: false })
}}





dislike = () => {
  if(this.state.dislike !==true) {
const dislikeObject = {
  dislikedSongId: this.props.id, 
  uid: this.props.uid,
  name: this.props.name
}
this.props.onDislike(dislikeObject);
this.setState({ dislike: true })

} else if (this.state.dislike === true) {
  const dislikeData = {
    requestId: this.props.id,
    dislikeId: this.findMe(this.props.id, this.props.dislikes)
  }
this.props.onRemoveDislike(dislikeData);
this.setState({ dislike: false })
}}




findMe = (id, list) => {
  let likes = [];
  for (const request of list) {
    if (request.requestId === id) {
    likes = request.likes
    } 
    
  }
  
  //console.log(likes);

 for(const key in likes) {
    if(likes.hasOwnProperty(key)) {
        var value = likes[key];
        if(value ==this.props.uid){
          return key;
        }
    }
    
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
  onLike: (likeObject) => dispatch(startAddLike(likeObject)),
  onRemoveLike: (likeObject) => dispatch(startRemoveLike(likeObject)),
  onDislike: (dislikeObject) => dispatch(startAddDislike(dislikeObject)),
  onRemoveDislike: (dislikeObject) => dispatch(startRemoveDislike(dislikeObject))
});

const mapStateToProps = state => {
  return {
      name: state.auth.name,
      uid: state.auth.uid,
      requests: state.requests,
      likes: state.likes
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(Request);