import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";


export default async function (req, res) {

  const model = new ChatOpenAI({});
  const promptTemplate = PromptTemplate.fromTemplate(
  "Tell me a joke about {topic}"
  );

  // You can also create a chain using an array of runnables
  const chain = RunnableSequence.from([promptTemplate, model]);

  const result = await chain.invoke({ topic: "bears" });
    // console.log("This is result;", result);
    debugger;
    // const data = await response.json();
    console.log("This is result;", result.content);

    res.status(200).json({ result: result.content })
}