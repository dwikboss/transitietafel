import { defineStore } from 'pinia';

export const useDatastore = defineStore({
    id: 'persona',

    state: () => ({
        persona: [] as Array<string>,
        lastMessage: '' as String,
        chatHistory: [] as any,
    }),

    getters: {
        getPersona() {
            return this.persona;
        },
        getLatestMessage() {
            return this.lastMessage;
        },
        getChatHistory() {
            if (localStorage.getItem('message-history')) {
                return JSON.parse(localStorage.getItem('message-history')  || '{}');
            } else {
                return null;
            }
        }
    },
    actions: {
        setPersona(persona: Array<string>) {
            this.persona = persona;
            localStorage.setItem("persona", JSON.stringify(persona));
        },
        setMessage(message: string) {
            this.lastMessage = message;
        },
        setHistory(chat: any) {
            const storedChatHistory = localStorage.getItem('message-history');
            if (storedChatHistory) {
                this.chatHistory = JSON.parse(storedChatHistory);
            } else {
                this.chatHistory = [];
            }

            this.chatHistory.push(chat);
            localStorage.setItem('message-history', JSON.stringify(this.chatHistory));
            console.log(JSON.parse(localStorage.getItem('message-history')  || '{}'));
        }
    },
});