import { initializeSocketConnection } from "../service/chat.socket.js";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api.js";
import { setChats, setCurrentChatId, setLoading, setError, addNewMessage, addMessages, createNewChat } from "../chat.slice.js";
import { useDispatch } from "react-redux";


export const useChat = () => {
    const dispatch = useDispatch();

    const handleSendMessage = async ({ message, chatId }) => {
        dispatch(setLoading(true));
        const data = await sendMessage({ message, chatId });
        const { chat, aiMessage } = data;
        console.log(aiMessage);

        if(!chatId){
            dispatch(createNewChat({
            chatId: chat._id,
            title: chat.title,
        }))
        }

        dispatch(addNewMessage({
            chatId: chatId || chat._id,
            content: message,
            role: "user",
        }))
        dispatch(addNewMessage({
            chatId: chatId || chat._id,
            content: aiMessage.content,
            role: aiMessage.role,
        }))

        dispatch(setCurrentChatId(chatId || chat._id));
        dispatch(setLoading(false));


    }

    const handleGetChats = async () => {
        dispatch(setLoading(true));
        try {
            const data = await getChats();
            const { chats } = data;
            dispatch(setChats(chats.reduce((acc, chat) => {
                acc[chat._id] = {
                    id: chat._id,
                    title: chat.title,
                    messages: chat.messages,
                    lastUpdated: chat.updatedAt,
                }
                return acc;
            }, {})));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleOpenChat = async (chatId) => {
        dispatch(setCurrentChatId(chatId));

        const data = await getMessages(chatId);
        const { messages } = data;

        const formattedMessages = messages.map(msg => ({
            id: msg._id || Math.random().toString(),
            content: msg.content,
            role: msg.role,
        }))

        dispatch(addMessages({
            chatId,
            messages: formattedMessages,
        }))
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
    }
}