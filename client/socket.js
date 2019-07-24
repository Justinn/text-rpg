import io from 'socket.io-client';
import store, { updateServerTime, updateUserTokens } from './store';
// import { updateActionTokenTimer } from './store/reducers';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected to server!');
});

socket.on('token-update', (tokens) => {
  store.dispatch(updateUserTokens(tokens));
  console.log('token update')
})

socket.on('server-time', serverTime => {
  console.log('servertime: ', serverTime);
  store.dispatch(updateServerTime(serverTime));
});

export default socket;
