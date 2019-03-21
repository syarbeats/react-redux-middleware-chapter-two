import React, { Component } from 'react';
import './App.css';
import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import {connect} from "react-redux";

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_START": {
      return{
        ...state,
        fetching: true
      }
      break;
    }
    case "FETCH_USERS_ERROR": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
      break;
    }
    case "RECEIVE_USERS": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      }
      break;
    }
  }
  return state;
}

const middleware = applyMiddleware(thunk, logger);
export const store =  createStore(reducer, middleware);

store.dispatch((dispatch) => {
  dispatch({type: "FETCH_USERS_START"});
  axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        dispatch({type: "RECEIVE_USERS", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_USERS_ERROR", payload: err})
      })
});

const mapStateToProps = state => {
  console.log('mapStateToProps', state.users);
  return {
    posts: state.users
  };
};


class App extends Component {
  render() {
    return (

          <div className="App">
            <h1>Learning React-Redux Middleware</h1>
            <p>Check inspect element to see the state..</p>
            <div>
              <div className="card">
                <div className="card-header">POSTS LIST</div>
                <div className="card-body">
                  <table className="table table-striped">
                    <tbody>
                    {this.props.posts.map((posts, i) => <TableRow key = {i} data = {posts} />)}
                    </tbody>e
                  </table>
                </div>
              </div>
            </div>
          </div>

    );
  }
}

class TableRow extends React.Component{
  render() {
    return (
        <tr>
          <td>{this.props.data.id}</td>
          <td>{this.props.data.title}</td>
          <td>{this.props.data.body}</td>
        </tr>
    );
  }
}
export default connect(mapStateToProps)(App);
