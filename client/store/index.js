import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './reducers';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import socket from '../socket';

const initialState = {
  user: {},
  players: [],
  actionTokenCoolDown: 0,
  serverTime: 0,
};

const GET_ALL_USERS = 'GET_ALL_USERS';
const GET_AUTH = 'GET_AUTH';
const LOGOUT = 'LOGOUT';
const UPDATE_ACTION_TOKEN_COOLDOWN = 'UPDATE_ACTION_TOKEN_COOLDOWN';
const UPDATE_SERVER_TIME = 'UPDATE_SERVER_TIME';
const UPDATED_USER = 'UPDATED_USER';
const UPDATE_USER_TOKEN = 'UPDATE_USER_TOKEN';

const gotAllUsers = players => {
  return { type: GET_ALL_USERS, players };
};

const gotAuth = user => {
  return { type: GET_AUTH, user };
};

export const updateActionTokenTimer = coolDown => {
  return { type: UPDATE_ACTION_TOKEN_COOLDOWN, coolDown };
};

export const updateServerTime = time => {
  return { type: UPDATE_SERVER_TIME, time };
};

const updatedUser = user => {
  return { type: UPDATED_USER, user };
};

export const updateUserTokens = tokens => {
  return { type: UPDATE_USER_TOKEN, tokens };
};

export const updateUser = () => {
  return async (dispatch, getState, { axios }) => {
    // console.log(getState().user.id)
    if (getState().user.id) {
      console.log(getState().user.id);
      const { data } = await axios.get(`/api/user/${getState().user.id}`);
      dispatch(updatedUser(data));
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch, getState, { axios }) => {
    const { data } = await axios.get(`/api/user/`);
    dispatch(gotAllUsers(data));
  };
};

export const getAuth = () => {
  return async (dispatch, getState, { axios }) => {
    const { data } = await axios.get('/api/user/auth');
    dispatch(gotAuth(data));
  };
};

export const login = (username, password) => {
  return async (dispatch, getState, { axios }) => {
    const { data } = await axios.put('/api/user/login', { username, password });
    dispatch(gotAuth(data));
    socket.emit('login', data);
    socket.emit('get-server-time');
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    await axios.delete('/api/user/logout');
    socket.emit('logout', getState().user.id);
    dispatch({ type: LOGOUT });
  };
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { players: action.players };
    case GET_AUTH:
      return { user: action.user };
    case LOGOUT:
      return { user: {} };
    // case UPDATE_ACTION_TOKEN_COOLDOWN:
    //   return { actionTokenCoolDown: action.coolDown };
    case UPDATE_SERVER_TIME:
      return { ...state, serverTime: action.time };
    case UPDATED_USER:
      return { ...state, user: action.user };
    case UPDATE_USER_TOKEN:
      // return { user.actionTokens: action.tokens };
    default:
      return state;
  }
};

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware.withExtraArgument({ axios }),
      loggingMiddleware
    )
  )
);
