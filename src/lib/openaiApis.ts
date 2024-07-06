import { useUser } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { any } from 'zod';
export interface RatingItem {
    coreValue: string;
    score: number;
}

export const isVideoTranscribed = async (uploadedFile: File) => {
    try {
        const formData = new FormData();
        formData.append('file', uploadedFile!);
        formData.append('model', 'whisper-1');

        const response = await fetch(`${process.env.NEXT_PUBLIC_OPENAI_URL}/audio/translations`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
            },
            body: formData
        });

        const text = await response.json();
        const transcribedText = text?.text;
        if (!transcribedText || !/[a-zA-Z0-9]/.test(transcribedText)) {
            throw new Error("Try again with a valid video with audio");
        }
        if (transcribedText.length < 100) {
            throw new Error("Sorry we cannot evaluate from this short file");
        }
        return transcribedText;
    } catch (error: any) {
        const err = error?.message || "Failed to evaluate Core Values. Please try again later."
        throw new Error(err);
    }
};

const getQuestion = (coreValues: string[]) => {

    const question = 'From the provided text, evaluate the following values (VALUES) and give a score out of ten for each value. If the value is not mentioned or cannot be inferred from the text, assign a score of 0 out of ten.'
    let valuesString = coreValues.join(",")
    return question.replace('(VALUES)', valuesString);
}

export const computeEvaluateValues = async (coreValues: string[], transcribedText: string, position: any,userId:any) => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_OPENAI_URL}chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant designed to output JSON.",
                    },
                    { role: "user", content: `${transcribedText} ${getQuestion(coreValues)}` },
                ],
                model: "gpt-3.5-turbo-0125",
            }),
        });

        const data = await response.json();
        const messageContent = data?.choices[0]?.message?.content;

        if (!messageContent) {
            throw new Error("No message content found in OpenAI response.");
        }

        const content = JSON.parse(messageContent);

        if (!content) {
            throw new Error("No values found in the response content.");
        }
        const ratingArray = convertToArrayOfObjects(content);
        if (ratingArray?.length <= 0) {
            throw new Error("Failed to evaluate Core Values. Please try again later.");
        }

        const isSelected = ratingArray.every(val => val.score > 5);
        savetoLocalstorage(position,isSelected,userId)
        return ratingArray;

    } catch (error: any) {
        const err = error?.message || "Failed to evaluate Core Values. Please try again later."

        throw new Error(err);
    }
};

function convertToArrayOfObjects(obj: any) {
    if (obj === null || typeof obj !== 'object') {
        throw new Error('Input must be a non-null object');
    }
    return Object.entries(obj).map(([key, value]) => ({ coreValue: key, score: typeof value === 'number' ? value : 0 }));
}


const savetoLocalstorage = (position: any, isSelected: boolean,userId:any) => {
    if (typeof window === 'undefined') {
        // If window is undefined, we are on the server side, return an empty array or handle accordingly
        return [];
      }
    const { name, profile } = position

    const usersData = localStorage.getItem('users');
    let users = usersData ? JSON.parse(usersData) : [];

    // eslint-disable-next-line
    let existingUser = users.find((u:{userId:string,profile:string[]}) => u.userId === userId);

    if (existingUser) {
        // If user exists, push the new profile to profiles array
        existingUser.profiles.push({ name, profile, isSelected });
    } else {
        // If user doesn't exist, create a new user object
        const newUser = {
            userId,
            profiles: [
                { name, profile, isSelected }
            ]
        };
        users.push(newUser);
    }


    localStorage.setItem('users', JSON.stringify(users));
}

export const getCurrentUserProfiles = (userId:any) => {
    if (typeof window === 'undefined') {
        // If window is undefined, we are on the server side, return an empty array or handle accordingly
        return [];
      }
    const usersData = localStorage.getItem('users');
    let users = usersData ? JSON.parse(usersData) : [];

    // Find the current user
    // eslint-disable-next-line
    let currentUser = users.find((u:{userId:string,profile:string[]}) => u.userId === userId);


    return currentUser?.profiles ?? [];
};
