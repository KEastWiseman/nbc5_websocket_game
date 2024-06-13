import socket from '../init/socket.js';
import { v4 as uuidv4 } from 'uuid';
import { handleConnection, handleDisconnect, handlerEvent } from './helper.js';

const registerHandler = (io) => {
    io.on('connection', ()=>{
        const userUUID = uuidv4();
        let user = {uuid : userUUID, socketId : socket.id}
        addUser(user);

        handleConnection(socket, userUUID);

        socket.on('event', (data) => handlerEvent(io, socket, data));
        socket.on('disconnect', (socket)=> handleDisconnect(socket, userUUID));
    })
}

export default registerHandler;