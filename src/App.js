import React, { Component } from 'react';
import './App.css';
import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';
import logger from 'redux-logger';
import thunk from 'redux-thunk'

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
      break
    }
  }
  return state;
}

const middleware = applyMiddleware(thunk, logger);
const store =  createStore(reducer, middleware);

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

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Learning React-Redux Middleware</h1>
        <p>Check inspect element to see the state..</p>
      </div>
    );
  }
}

export default App;
