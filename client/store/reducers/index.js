const axios = require('axios');

const initialState = {
  user: {},
  players: [],
};

const GET_ALL_USERS = 'GET_ALL_USERS';
const GET_AUTH = 'GET_AUTH';

const gotAllUsers = players => {
  return { type: GET_ALL_USERS, players };
};

const gotAuth = user => {
  return { type: GET_AUTH, user };
};

export const getAllUsers = () => {
  return async dispatch => {
    const { data } = await axios.get(`/api/user/`);
    dispatch(gotAllUsers(data));
  };
};

export const getAuth = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/user/auth');
    dispatch(gotAuth(data));
  };
};

export const login = (username, password) => {
  return async dispatch => {
    const { data } = await axios.put('/api/user/login', { username, password });
    dispatch(gotAuth(data));
  };
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { players: action.players };
    case GET_AUTH:
      return { user: action.user };
    default:
      return state;
  }
};

export default rootReducer;
