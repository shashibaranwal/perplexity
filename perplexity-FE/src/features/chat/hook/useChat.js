import { initializeSocketConnection } from "../service/chat.socket.js";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api.js";
import { setChats, setCurrentChatId, setLoading, setError, addNewMessage, createNewChat } from "../chat.slice.js";
import { useDispatch } from "react-redux";


export const useChat = () => {
    const dispatch = useDispatch();

    const handleSendMessage = async ({message, chatId}) => {
        dispatch(setLoading(true));
        const data = await sendMessage({message, chatId});
        const { chat, aiMessage } = data;
        console.log(aiMessage);
        
        dispatch(createNewChat({
            chatId: chat._id,
            title: chat.title,
        }))

        dispatch(addNewMessage({
            chatId: chat._id,
            content: message,
            role: "user",
        }))
        dispatch(addNewMessage({
            chatId: chat._id,
            content: aiMessage.content,
            role: aiMessage.role,
        }))
        
        dispatch(setCurrentChatId(chat._id));
        dispatch(setLoading(false));


    }

    return {
        initializeSocketConnection,
        handleSendMessage,
    }
}