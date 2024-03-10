import { runChatAgent } from '@/services/llmAgents/llmChatAgent';




export default async function (req, res) {
  console.log("Thes are the request body", req.body);
  const input = req.body.messages[0]['content'];
  const result = await runChatAgent(input);
  res.status(200).json({ result: result.output })
}