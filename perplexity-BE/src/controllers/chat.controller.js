import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";


export const sendMessage = async (req, res) => {
    const { message, chat: chatId } = req.body;
    let title = null, chat = null;

    if(!chatId){
        title = await generateChatTitle(message);

        chat = await chatModel.create({
            user: req.user.id,
            title,
        })
    }

    const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: message,
        role: 'user'
    })

    const messages = await messageModel.find({chat: chatId})

    const result = await generateResponse(messages);

    const aiMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: result,
        role: 'AI'
    })
    console.log(messages);
    
    res.status(201).json({
        title,
        chat,
        aiMessage
    })
}

export const getChats = async (req, res) => {
    const user = req.user
    const chats = await chatModel.find({ user: user.id})

    res.status(200).json({
        message: "Chats received successfully",
        chats
    })
}

export const getMessages = async (req, res) => {
    const { chatId } = req.params;

    const chat = await chatModel.findById({
        _id: chatId,
        user: req.user.id
    })

    if(!chat){
        return res.status(404).json({
            message: "Chat not found"
        })
    }
    const messages = await messageModel.find({ chat: chatId})

    res.status(200).json({
        message: "Messages received successfully",
        messages
    })
}

export const deleteChat = async (req, res) => {
    const { chatId } = req.params;

    const chat = await chatModel.findById({
        _id: chatId,
        user: req.user.id
    })

    if(!chat){
        return res.status(404).json({
            message: "Chat not found"
        })
    }
    await chatModel.deleteOne({ _id: chatId })
    await messageModel.deleteMany({ chat: chatId })

    res.status(200).json({
        message: "Chat deleted successfully"
    })
}
