import { Server } from 'socket.io';
import { runChatAgent } from '@/services/llmAgents/llmChatAgent';

export default async function (req, res) {
  console.log("These are the request body", req.body);
  const input = req.body.messages[0]['content'];
  const result = await runChatAgent(input);

  // Send the result to index.tsx via socket
  const io = new Server(res.socket.server);
  io.on('connection', (socket) => {
    socket.emit('chatResponse', { text: result.output });
  });

  res.status(200).json({ result: result.output });
}