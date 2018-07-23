import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
  render() {
    return (
      <tr className="table-default" key={this.props.id}>
        <td>{this.props.joke}</td>
        <td> UpVotes:{'   '}</td>
        <td>
          {' '}
          <b>{this.props.upVote}</b>{' '}
        </td>
        <td>
          <button className="button" onClick={this.props.updateUpVote}>
            <i className="fas fa-thumbs-up fa-2x" />
          </button>
        </td>
        <td>DownVotes: {'   '} </td>
        <td>
          {' '}
          <b>{this.props.downVote}</b>{' '}
        </td>
        <td>
          <button className="button" onClick={this.props.updateDownVote}>
            <i className="fas fa-thumbs-down fa-2x" />
          </button>
        </td>
      </tr>
    );
  }
}

export default Joke;
