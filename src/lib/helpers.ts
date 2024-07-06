import axios from "axios";

export const isValidWord = async (word: string): Promise<boolean> => {
    try {
        // const response = await axios.get(`https://api.datamuse.com/sld?s=${word}`);
        // const data = response.data;
        const data = [];

        // Check if the API returned any suggestions
        return data.length === 0;
    } catch (error) {
        return false;
    }
};