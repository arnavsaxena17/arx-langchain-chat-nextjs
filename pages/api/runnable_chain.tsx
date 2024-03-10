import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";


export default async function (req, res) {

  const model = new ChatOpenAI({});
  const chat_body = req.body
  console.log("This is the chat_body", chat_body);
  console.log("Number of messages::", chat_body.history.length);
  
  const promptTemplate = PromptTemplate.fromTemplate(
    "Tell me a joke about {topic}"
  );

  // You can also create a chain using an array of runnables
  const chain = RunnableSequence.from([promptTemplate, model]);

  const result = await chain.invoke({ topic: "pandas" });
    // console.log("This is result;", result);
    // const data = await response.json();
    console.log("This is result;", result.content);

    res.status(200).json({ result: result.content })
}