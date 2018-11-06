import React from 'react';
import { connect } from 'react-redux';
import { startAddLike, startRemoveLike } from '../actions/like';
import { startAddDislike, startRemoveDislike } from '../actions/dislike';

export class Request extends React.Component {
  constructor() {
    super();
    this.state = {
      like: undefined,
      dislike: undefined,
      numberOfLikes: 0,
      numberOfDislikes: 0,
    };
  }
  componentWillReceiveProps(nextProps){
    this.setState(() => ({ numberOfLikes: nextProps.likes.length }));
    this.setState(() => ({ numberOfDislikes: nextProps.dislikes.length }));
  }


  componentDidMount() {
    //HVIS JEG ALLEREDE HAR LIKED, SET STATE.LIKE = TRUE
    for (const key in this.props.likes) {
      if (this.props.likes.hasOwnProperty(key)) {
        var value = this.props.likes[key];
        if (Object.values(value)[0] === this.props.uid) {
          this.setState(() => ({ like: true }))
        }
      }
    }
    //HVIS JEG ALLEREDE HAR DISLIKED, SET STATE.DISLIKE = TRUE
    for (const key in this.props.dislikes) {
      if (this.props.dislikes.hasOwnProperty(key)) {
        var value = this.props.dislikes[key];
        if (Object.values(value)[0] === this.props.uid) {
          this.setState(() => ({ dislike: true }))
        }
      }
    }
  }

  likeHandler = () => {
    if (this.state.like !== true) {
      const likeObject = {
        uid: this.props.uid,
        name: this.props.name
      }

      this.setState(() => ({ like: true }), () => {
        this.props.onLike(this.props.id, likeObject);
      });
    if (this.state.dislike === true) {
        this.setState(() => ({ dislike: false }), () => {
          this.props.onRemoveDislike(this.props.id, this.findReactionId(this.props.dislikes));
        });
      }
  } else if (this.state.like === true) {
      this.setState(() => ({ like: false }), () => {
        this.props.onRemoveLike(this.props.id, this.findReactionId(this.props.likes));
      });
    }
  }


  dislikeHandler = () => {
    if (this.state.dislike !== true) {
      const dislikeObject = {
        uid: this.props.uid,
        name: this.props.name
      }

      this.setState(() => ({ dislike: true }), () => {
        this.props.onDislike(this.props.id, dislikeObject);
      });
      if (this.state.like === true) {
        this.setState(() => ({ like: false }), () => {
          this.props.onRemoveLike(this.props.id, this.findReactionId(this.props.likes));
        });
      }
    } else if (this.state.dislike === true) {
      this.setState(() => ({ dislike: false }), () => {
        this.props.onRemoveDislike(this.props.id, this.findReactionId(this.props.dislikes));
      });
    }
  }

  findReactionId = (list) => {
    let foundReactionId = '';
    list.forEach(element => {
      if (Object.values(element)[0] === this.props.uid && Object.values(element)[0]) {
        foundReactionId = Object.keys(element)[0];
      }
    });
    return foundReactionId;
  }

  render() {
    return (
      <React.Fragment>
        <tr>

          <td>
            <h3 className="song-title">{this.props.title}</h3>
            <p className="artist-name">{this.props.artist}</p>
          </td>
          <td className="vote-column">
            <p>{this.state.numberOfDislikes}</p>
            
            <button className="vote-btn dislike" onClick={this.dislikeHandler}>
              <i className="material-icons" style={this.state.dislike ? { color: 'red' } : null}>thumb_down</i>
            </button>
          </td>
          <td className="vote-column">
            <p>{this.state.numberOfLikes}</p>
            <button className="vote-btn like" onClick={this.likeHandler}>
              <i className="material-icons" style={this.state.like ? { color: 'green' } : null}>thumb_up</i>
            </button>
          </td>
        </tr>
      </React.Fragment>
    )
  };

}
const mapDispatchToProps = (dispatch) => ({
  onLike: (id, likeObject) => dispatch(startAddLike(id, likeObject)),
  onRemoveLike: (likedSongId, likeId) => dispatch(startRemoveLike(likedSongId, likeId)),
  onDislike: (id, dislikeObject) => dispatch(startAddDislike(id, dislikeObject)),
  onRemoveDislike: (dislikedSongId, dislikeId) => dispatch(startRemoveDislike(dislikedSongId, dislikeId))
});

const mapStateToProps = state => {
  return {
    name: state.auth.name,
    uid: state.auth.uid,
    requests: state.requests
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Request);