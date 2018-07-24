import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import './JokeList.css';

class JokesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allJokes: [],
      loadingMessage: 'Loading....'
    };
  }

  async componentDidMount() {
    try {
      const promises = Array.from({ length: 20 }).map((j, idx) => {
        // request details from  API with axios
        const response = axios('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' }
        }).then(res => {
          console.log(idx);

          return {
            joke: res.data.joke,
            id: res.data.id,
            upVote: '',
            downVote: ''
          };
        });
        return response;
      });

      const results = await Promise.all(promises);
      //=========== delete duplicates
      let idxs = new Set();
      let uniqueResults = [];
      results.map(j => {
        if (!idxs.has(j.id)) {
          idxs.add(j.id);
          uniqueResults.push(j);
        }
        return j;
      });

      this.setState({
        allJokes: uniqueResults,
        loadingMessage: ''
      });
    } catch (err) {
      return console.log(err);
    }
  }

  handleClick = async () => {
    this.setState({
      loadingMessage: 'Loading....'
    });
    const promises = Array.from({ length: 20 }).map((j, idx) => {
      // request details from  API with axios
      const response = axios('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
      }).then(res => {
        console.log(idx);

        return {
          joke: res.data.joke,
          id: res.data.id,
          upVote: '',
          downVote: ''
        };
      });
      return response;
    });
    const newResults = await Promise.all(promises);

    let idxs = new Set();
    let uniqueResults = [];
    newResults.map(j => {
      if (!idxs.has(j.id)) {
        idxs.add(j.id);
        uniqueResults.push(j);
      }
      return j;
    });

    this.setState({
      allJokes: uniqueResults,
      loadingMessage: ''
    });
  };

  handleUpVote = id => {
    const updateJokes = this.state.allJokes.map(joke => {
      if (joke.id === id) {
        return { ...joke, upVote: +joke.upVote + 1 };
      }
      return joke;
    });
    this.setState({
      allJokes: updateJokes,
      loadingMessage: ''
    });
  };

  handleDownVote = id => {
    const updateJokes = this.state.allJokes.map(joke => {
      if (joke.id === id) {
        return { ...joke, downVote: +joke.downVote + 1 };
      }
      return joke;
    });
    this.setState({
      allJokes: updateJokes,
      loadingMessage: ''
    });
  };

  render() {
    let jokes = this.state.allJokes.map(j => (
      <Joke
        key={j.id}
        id={j.id}
        joke={j.joke}
        upVote={j.upVote}
        downVote={j.downVote}
        updateUpVote={() => this.handleUpVote(j.id)}
        updateDownVote={() => this.handleDownVote(j.id)}
      />
    ));
    if (this.state.loadingMessage.length === 0)
      return (
        <table className="JokeList table table-default">
          <thead>
            <tr>
              <th>
                {' '}
                <button
                  className="NewJokesButton btn btn-primary btn-lg"
                  type="button"
                  onClick={this.handleClick}
                >
                  Get New Jokes
                </button>
              </th>
            </tr>
          </thead>
          <tbody>{jokes}</tbody>
        </table>
      );
    else
      return (
        <div>
          <i className="fas fa-spinner fa-5x fa-spin" />
        </div>
      );
  }
}

export default JokesList;
