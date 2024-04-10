import { defineStore } from 'pinia';

export const useDatastore = defineStore({
    id: 'persona',

    state: () => ({
        persona: [] as Array<string>,
    }),
    getters: {
        getPersona() {
            return this.persona;
        },
    },
    actions: {
        setPersona(persona: Array<string>) {
            this.persona = persona;
            console.log(this.persona);
        },
    },
});