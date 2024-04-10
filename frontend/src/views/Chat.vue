<template>
    <div class="page chat">

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useDatastore } from '../store/Datastore';
import AppHeader from '../components/AppHeader.vue';
import InputField from '../components/InputField.vue';
import axios from 'axios';

export default defineComponent({
    name: 'Chat',
    components: {
        AppHeader,
        InputField,
    },
    data() {
        return {
        };
    },
    mounted() {
        this.fetchChat();
    },
    methods: {
        async fetchChat() {
            const datastore = useDatastore();
            try {
                const persona = {
                    description: datastore.getPersona[0],
                    location: datastore.getPersona[1],
                    interests: [datastore.getPersona[2]],
                };

                const response = await axios.post('https://avoord-transitietafel-api-acc.lwdev.nl/api/relevantarticles', {
                    persona,
                });

                // this.articles = response.data.context;
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        },
    },
});

</script>

<style lang="scss" scoped>
.page.dashboard {
    background-color: var(--light-blue);
    min-height: 100vh;

    .dashboard-main {
        padding: var(--unit);
    }

    .full-width {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    h1 {
        margin-top: 32px;
        margin-bottom: 16px;
        color: var(--white);
        text-align: center;
    }

    h2 {
        color: var(--white);
        font-weight: 600;
    }
}
</style>