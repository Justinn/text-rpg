const axios = require('axios');

const initialState = {
  user: {},
  players: []
};

const GET_ALL_USERS = 'GET_ALL_USERS';

const gotAllUsers = players => {
  return { type: GET_ALL_USERS, players };
};

export const getAllUsers = () => {
  return async dispatch => {
    const { data } = await axios.get(`/api/user/`);
    dispatch(gotAllUsers(data));
  };
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS: 
        return {players: action.players}
    default:
      return state;
  }
};

export default rootReducer;
