import { generateResponse, generateChatTitle } from "../services/ai.service.js";


export const sendMessage = async (req, res) => {
    const { message } = req.body;
    const user = req.user;
    
    const title = await generateChatTitle(message);
    const result = await generateResponse(message);
    
    res.status(200).json({
        ai_response: result,
        title
    })
}