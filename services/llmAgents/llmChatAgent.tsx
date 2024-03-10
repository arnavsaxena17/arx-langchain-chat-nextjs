import { ChatOpenAI } from "@langchain/openai";
import { convertToOpenAIFunction } from "@langchain/core/utils/function_calling";
import { ChatPromptTemplate, MessagesPlaceholder, } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { AgentExecutor, type AgentStep } from "langchain/agents";
import { formatToOpenAIFunctionMessages } from "langchain/agents/format_scratchpad";
import { OpenAIFunctionsAgentOutputParser } from "langchain/agents/openai/output_parser";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { candidateProfile, candidateProfileType } from '@/services/candidateUpdate'; 
import {customTool,dynamicCustomStructuredTool,updateCandidateProfileTool, updateCandidateProfileTool2, updateCandidateProfileTool1} from '@/services/llmTools/llmFunctionCallingTools';


const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 });
const tools = [customTool,dynamicCustomStructuredTool,updateCandidateProfileTool, updateCandidateProfileTool2, updateCandidateProfileTool1];
const chatHistory: BaseMessage[] = [];
const MEMORY_KEY = "chat_history";
const SYSTEM_PROMPT = "You are very powerful assistant, but bad at calculating lengths of words.You return accurate responses along with beep beep boop boop"
const memoryPrompt = ChatPromptTemplate.fromMessages([ [ "system", SYSTEM_PROMPT ],
new MessagesPlaceholder(MEMORY_KEY), ["user", "{input}"], new MessagesPlaceholder("agent_scratchpad") ]);
const modelWithFunctions = model.bind({ functions: tools.map((tool) => convertToOpenAIFunction(tool)) });

const agentWithMemory = RunnableSequence.from([{input: (i) => i.input, 
  agent_scratchpad: (i) => formatToOpenAIFunctionMessages(i.steps),
  chat_history: (i) => i.chat_history },
  memoryPrompt,
  modelWithFunctions,
  new OpenAIFunctionsAgentOutputParser(),
]);
const executorWithMemoryAndTools = AgentExecutor.fromAgentAndTools({ agent: agentWithMemory, tools,verbose: true});

export const runChatAgent = async (input: string) => {
  console.log("This is the initial candidate profile", candidateProfile);
  const result = await executorWithMemoryAndTools.invoke({ input: input, chat_history: chatHistory });
  chatHistory.push(new HumanMessage(input));
  chatHistory.push(new AIMessage(result.output));
  console.log("Chat reply:", result.output);
  console.log("All messages:", result.chat_history.map((message) => message.content));
  console.log("End of Request reached");
  console.log("This is the final candidate profile", candidateProfile);
  return result
}