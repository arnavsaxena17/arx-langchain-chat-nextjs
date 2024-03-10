import { DynamicTool, DynamicStructuredTool  } from "@langchain/core/tools";
import { candidateProfile, candidateProfileType } from '@/services/candidateUpdate'; 
import { z } from "zod";


import { connectToDatabase } from '@/services/database/db_master';

async function fetchCandidates() {
    const {client, db} = await connectToDatabase()
    const query_obj = {'job_process.applications.user_id': '63c15d0cd44cbd06297c22ac', 'tables': 'd35191bf78ca41a68340ddea3ca38c5e'}
    const candidates = await db.collection('candidates').find(query_obj).toArray()
    console.log("Candidates: ", candidates);
    return candidates
}

async function updateCandidateStatus(candidate){
    console.log("Updating candidate status: ", candidate);
    const {client, db} = await connectToDatabase()
    console.log("Connected to database", db);    
    const query_obj = {'_id': candidate._id}
    const update_obj = {$set: {'job_process.applications.$.status': candidate.status}}
    const result = await db.collection('candidates').updateOne(query_obj, update_obj)
    console.log("Result: ", result);
    return result
}

async function functCountWordLength (input: string) {
    const length = input.length.toString();
    console.log("Length found is", length)
    return length
  } 


async function randomNumberGenerator ({ low, high }) {
    console.log("Your low is", low);
    console.log("Your high is", high);
    const randomNumberGenerated = (Math.random() * (high - low) + low).toString();
    console.log("Random number generated is", randomNumberGenerated);
    return randomNumberGenerated
}



async function updateCandidateProfile  (input:string) {
    console.log("This is the input", input);
    candidateProfile.status = "test";
    const result  = updateCandidateStatus(candidateProfile);
    return JSON.stringify(result);
}



async function updateCandidateProfile1  (input:string) {
    console.log("This is the input for updateCandidateProfile1", input);
    candidateProfile.status = "test";
    const result  = updateCandidateStatus(candidateProfile);
    return JSON.stringify(result);
}



async function updateCandidateProfile2  (input:string) {
    console.log("This is the input for updateCandidateProfile2", input);
    candidateProfile.status = "test";
    const result  = updateCandidateStatus(candidateProfile);
    return JSON.stringify(result);
}


export const dynamicCustomStructuredTool = new DynamicStructuredTool({
    name: "random-number-generator",
    description: "generates a random number between two input numbers",
    schema: z.object({
        low: z.number().describe("The lower bound of the generated number"),
        high: z.number().describe("The upper bound of the generated number"),
    }),
    func: randomNumberGenerator
});

    
export const customTool = new DynamicTool({ name: "get_word_length", description: "Returns the length of a word.", func: functCountWordLength });
export const updateCandidateProfileTool = new DynamicTool({ name: "update_candidate_profile", description: "Update the candidate profile.", func: updateCandidateProfile });
export const updateCandidateProfileTool1 = new DynamicTool({ name: "updateCandidateProfile1", description: "Update the candidate profile 1.", func: updateCandidateProfile1 });
export const updateCandidateProfileTool2 = new DynamicTool({ name: "updateCandidateProfile2", description: "Update the candidate profile 2.", func: updateCandidateProfile2 });
