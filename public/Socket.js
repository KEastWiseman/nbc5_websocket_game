import { CLIENT_VERSION } from './Constants.js';

const socket = io('http://3.39.235.163:3000', {
  query: {
    clientVersion: CLIENT_VERSION,
  },
});

let userId = null;

socket.on('response', (data) => {
  console.log(data);
});

socket.on('connection', (data) => {
  console.log('connection: ', data.uuid);
  userId = data.uuid;
  try{
    const { itemUnlocks, items, stages} = data.data;
    localStorage.setItem(itemUnlocks.name,JSON.stringify(itemUnlocks.data));
    localStorage.setItem(items.name,JSON.stringify(items.data));
    localStorage.setItem(stages.name,JSON.stringify(stages.data));
  } catch(e){
    console.log('Invalid init data : ', e);
  }
});

const sendEvent = (handlerId, payload) => {
  socket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload,
  });
};

export { sendEvent };
