import { defineStore } from 'pinia';

export const useDatastore = defineStore({
    id: 'persona',

    state: () => ({
        persona: [] as Array<string>,
        messageHistory: [] as Array<string>,
        lastMessage: '' as String,
    }),

    getters: {
        getPersona() {
            return this.persona;
        },
        getLatestMessage() {
            return this.lastMessage;
        },
        getMessageHistory() {
            return this.messageHistory;
        }
    },
    actions: {
        setPersona(persona: Array<string>) {
            this.persona = persona;
            console.log(this.persona);
        },
        setMessage(message: string) {
            this.lastMessage = message;
            this.messageHistory.push(message);
        },
    },
});