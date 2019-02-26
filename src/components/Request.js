import React from 'react';
import { connect } from 'react-redux';
import { startAddLike, startRemoveLike } from '../actions/like';
import { startAddDislike, startRemoveDislike } from '../actions/dislike';
import { startDeleteRequest } from '../actions/requests';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

export class Request extends React.Component {
  constructor() {
    super();
    this.state = {
      like: undefined,
      dislike: undefined,
      numberOfLikes: 0,
      numberOfDislikes: 0,
      score: 0,
      plusSymbol: true
    };
  }

  componentDidMount() {
    //SETTING INITIAL AMOUNTS OF LIKES, DISLIKES AND SCORE
    this.setState(() => ({ numberOfLikes: this.props.likes.length }));
    this.setState(() => ({ numberOfDislikes: this.props.dislikes.length }));
    this.setState((prevState) => ({ score: prevState.numberOfLikes - prevState.numberOfDislikes }));

    //SETTING INITIAL PLUS SYMBOLS
    if (this.props.likes.length-this.props.dislikes.length > 0) {
      this.setState(() => ({ plusSymbol: true }));
    } else if (this.state.score <= 0) {
      this.setState(() => ({ plusSymbol: false }));
    }

    //IF ALREADY LIKED, SET STATE.LIKE = TRUE
    for (const key in this.props.likes) {
      if (this.props.likes.hasOwnProperty(key)) {
        var value = this.props.likes[key];
        if (Object.values(value)[0] === this.props.uid) {
          this.setState(() => ({ like: true }))
        }
      }
    }
    //IF ALREADY DISLIKED, SET STATE.DISLIKE = TRUE
    for (const key in this.props.dislikes) {
      if (this.props.dislikes.hasOwnProperty(key)) {
        var value = this.props.dislikes[key];
        if (Object.values(value)[0] === this.props.uid) {
          this.setState(() => ({ dislike: true }))
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    //LISTENING AND SETTING STATE WITH THE NEW LIKE AND DISLIKE VALUES
    this.setState(() => ({ numberOfLikes: nextProps.likes.length }));
    this.setState(() => ({ numberOfDislikes: nextProps.dislikes.length }));
    this.setState(() => ({ score: nextProps.likes.length - nextProps.dislikes.length }));

    //LISTENING AND SETTING PLUS ON NEW LIKE AND DISLIKES
    if ((nextProps.likes.length - nextProps.dislikes.length) > 0) {
      this.setState(() => ({ plusSymbol: true }));
    } else if (nextProps.likes.length - nextProps.dislikes.length <= 0) {
      this.setState(() => ({ plusSymbol: false }));
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

  deleteRequest = () => {
    this.props.onDeleteRequest(this.props.id);
  }

  submit = () => {
    confirmAlert({
      title: 'Delete request',
      message: 'Are you sure you wanna delete this request?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteRequest()
        },
        {
          label: 'No',
        }
      ]
    })
  };

  render() {
    return (
      <React.Fragment>
        <tr>
          <td className="name-column">
            <h3 className="song-title">{this.props.title}</h3>
            <p className="artist-name">{this.props.artist}</p>
          </td>
          <td className="vote-column">
            <button className="vote-btn dislike" onClick={this.dislikeHandler}>
              <i className="material-icons" style={this.state.dislike ? { color: '#E54D42' } : null}>arrow_drop_down</i>
            </button>
          </td>
          <td className="count-column">
            <h3>{/* this.state.plusSymbol ? '+' : ''*/}{this.state.score}</h3>
          </td>
          <td className="vote-column">
            <button className="vote-btn like" onClick={this.likeHandler}>
              <i className="material-icons" style={this.state.like ? { color: '#39CA74' } : null}>arrow_drop_up</i>
            </button>
          </td>
          {/*<td className="delete-column">
              {this.props.createdBy === this.props.uid ? <button className="delete-btn" onClick={this.submit}><i className="material-icons">delete_forever</i></button> : null}
            </td>*/}
        </tr>
      </React.Fragment>
    )
  };
}
const mapDispatchToProps = (dispatch) => ({
  onLike: (id, likeObject) => dispatch(startAddLike(id, likeObject)),
  onRemoveLike: (likedSongId, likeId) => dispatch(startRemoveLike(likedSongId, likeId)),
  onDislike: (id, dislikeObject) => dispatch(startAddDislike(id, dislikeObject)),
  onRemoveDislike: (dislikedSongId, dislikeId) => dispatch(startRemoveDislike(dislikedSongId, dislikeId)),
  onDeleteRequest: (id) => dispatch(startDeleteRequest(id))
});

const mapStateToProps = state => {
  return {
    name: state.auth.name,
    uid: state.auth.uid,
    requests: state.requests
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Request);