import { chats as fakeChatsData } from "constants";

const getAllChats = () => Promise.resolve(fakeChatsData);


export const fakeChatApi = {
    getAllChats
}