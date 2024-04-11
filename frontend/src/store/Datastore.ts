import { defineStore } from 'pinia';

export const useDatastore = defineStore({
    id: 'persona',

    state: () => ({
        persona: [] as Array<string>,
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
            localStorage.setItem("persona", JSON.stringify(persona));
        },
        setMessage(message: string) {
            this.lastMessage = message;
        },
    },
});