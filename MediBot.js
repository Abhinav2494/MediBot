import { GoogleGenerativeAI } from "@google/generative-ai";
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import 'dotenv/config'; 

async function main() {
    const apiKey = "AIzaSyA6DFJyOIi_3Q5-JyCKb_IgxDNbStF_gW8";
    if (!apiKey) {
        console.error("API Invalid");
        return;
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        
        model: "gemini-2.5-flash", 
        systemInstruction: prompt,
        generationConfig: {
            temperature: 0.1,
        },
    });

    const chat = model.startChat({ history: [] });
    const rl = readline.createInterface({ input, output });
    console.clear()
    console.log("Ask me a medical question.");

    while (true) {
        const user_input = await rl.question("You: ");
        console.log();

        if (user_input.toLowerCase() === 'quit') {
            console.log("MedBot: Goodbye!");
            rl.close();
            break;
        }

        try {
            const result = await chat.sendMessage(user_input);
            const response = result.response;
            
            console.log(`MedBot: ${response.text()}`);
            console.log();

        } catch (error) {
            console.error(`An error occurred: ${error.message}`);
        }
    }
}
const prompt = `You are medical advisor. you need to answer cure and symptoms of any disease, illness.  Use the pieces of information provided in the context to answer user's question. 
                Start the answer directly. No small talk please.
                the answer should be crisp`

main();