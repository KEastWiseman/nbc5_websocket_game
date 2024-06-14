import { v4 as uuidv4 } from 'uuid';
import { addUser } from '../models/user.model.js';
import { handleConnection, handleDisconnect, handlerEvent } from './helper.js';

const registerHandler = (io) => {
    io.on('connection', async (socket)=>{
        const userUUID = uuidv4();
        let user = {uuid : userUUID, socketId : socket.id}
        
        addUser(user);
        handleConnection(socket, userUUID);

        socket.on('event', (data) => handlerEvent(io, socket, data));
        socket.on('disconnect', (socket)=> handleDisconnect(socket, userUUID));
    })
}

export default registerHandler;