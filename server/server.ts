import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

interface Message {
  text: string;
}

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (data: Message) => {
    console.log('Message received:', data);
    io.emit('chatResponse', { text: 'Response from chat_agent' });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});