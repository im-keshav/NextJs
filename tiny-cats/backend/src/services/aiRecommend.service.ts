import { recommendCatsService } from "./cat.service.ts";
import generateAiResponse from "./gemini.service.ts";

export const aiRecommendService = async (kidsFriendly:boolean,apartmentFriendly:boolean)=>{
 let matchCatsFromDb = await recommendCatsService(kidsFriendly,apartmentFriendly);
    const prompt = `
You are a professional cat expert and pet advisor.

The user wants to find the most suitable cat based on these two preferences:

- Kids Friendly: ${kidsFriendly}
- Apartment Friendly: ${apartmentFriendly}

Your task is to compare these preferences with the available cat data and recommend the best matching cats.

Instructions:
1. Prioritize cats that match BOTH user preferences.
2. Rank the matching cats from best to least suitable.
3. If no cat matches both preferences, recommend the closest available matches.
4. Do not invent or modify any cat information.
5. Give a short and clear reason why each recommended cat is suitable.
6. Keep the response helpful and easy for a normal pet owner to understand.

Return ONLY valid JSON in this format:

{
  "bestMatch": {
    "name": "Cat name",
    "breed": "Cat breed",
    "reason": "Why this cat is the best match"
  },
  "recommendations": [
    {
      "name": "Cat name",
      "breed": "Cat breed",
      "reason": "Why this cat matches the user's preferences"
    }
  ],
  "summary": "Short comparison summary"
}
`;


const aiResponse = await generateAiResponse(prompt );

return aiResponse;

}