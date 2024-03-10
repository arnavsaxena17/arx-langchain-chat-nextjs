
export interface candidateProfileType {
    status: string;
    name: string;
    email: string;
    input: string; // Add the 'input' property
  }

export const candidateProfile:candidateProfileType = {
  name: 'John Doe',
  email: 'panda@panda.com',
  input: "",
  status: ""
}