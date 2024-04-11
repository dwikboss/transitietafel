<template>
  <div class="page chat">
    <AppHeader fontColor="white" />
    <div class="full-width">
      <div class="chat-container">
        <div class="chat-heading">
          <div class="assistant-image"></div>
          <h2>Stel jouw vraag</h2>
        </div>
        <div class="chat-box">
          <div class="chat-area">
            <ChatMessage v-for="(chat, index) in chatIdentifiers" :key="index" :chat="chat" />
          </div>
          <div class="input-area">
            <InputField borderStyle="" placeholder="Type jouw vraag..." @submit="fetchChat" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useDatastore } from '../store/Datastore';
import type { Chat } from '../interfaces/_IChat';
import type { ChatIdent } from '../interfaces/_IChatIdent';
import AppHeader from '../components/AppHeader.vue';
import InputField from '../components/InputField.vue';
import ChatMessage from '../components/ChatMessage.vue';
import axios from 'axios';

export default defineComponent({
  name: 'Chat',
  components: {
    AppHeader,
    InputField,
    ChatMessage,
  },
  data() {
    return {
      chatHistory: [] as any,
      chatIdentifiers: [] as ChatIdent[],
      error: null as string | null,
    };
  },
  mounted() {
    this.fetchChat();
  },
  methods: {
    async fetchChat(input?: string) {
      const datastore = useDatastore();
      let storagePersona;
      let persona;

      try {
        if (localStorage.getItem('persona')) {
          console.log();
          storagePersona = JSON.parse(localStorage.getItem('persona') || '{}');

          persona = {
            description: storagePersona[0],
            location: storagePersona[1],
            interests: [storagePersona[2]],
          };
        } else {
          persona = {
            description: datastore.getPersona[0],
            location: datastore.getPersona[1],
            interests: [datastore.getPersona[2]],
          };
        }

        let question: string;
        if (input) {
          question = input;
        } else {
          question = datastore.getLatestMessage;
        }

        this.addChat(question, true);
        const messageHistory: string[] = [];

        const response = await axios.post('https://avoord-transitietafel-api-acc.lwdev.nl/api/question', {
          question,
          messageHistory,
          persona,
        });

        const answer = response.data.answer;
        const date = new Date().toISOString();
        const interest = persona.interests[0];

        this.addChat(answer, false);
        this.updateChatHistory(question, answer, date, interest);
      } catch (error) {
        this.handleError(error);
      }
    },
    handleError(error: any) {
      this.error = 'An error occurred while fetching chat data.';
      console.error('Error fetching chat data:', error);
    },
    updateChatHistory(question: string, answer: string, date: string, interest: string) {
      const datastore = useDatastore();
      const chat: Chat = {
        question,
        answer,
        date,
        interest,
      };

      datastore.setHistory(chat);
    },
    addChat(message: string, user: boolean) {
      const chat: ChatIdent = {
        message,
        user,
      };
      this.chatIdentifiers.push(chat);
    },
  },
});
</script>

<style lang="scss" scoped>
.page.chat {
  background: rgb(34, 137, 186);
  background: radial-gradient(circle, rgba(34, 137, 186, 1) 0%, rgba(14, 107, 137, 1) 100%);
  min-height: 100vh;

  .full-width {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .chat-container {
    width: 75%;
    display: flex;
    flex-direction: column;
    gap: 35px;

    .chat-heading {
      gap: 15px;
      display: flex;
      align-items: center;
      margin-top: 3%;

      .assistant-image {
        width: 75px;
        height: 75px;
        background-image: url('@/assets/images/chat_assistant.png');
        background-position: center;
        background-size: cover;
        border-radius: 999px 999px 999px 0px;

        @media (max-width: 767.98px) {
          width: 65px;
          height: 65px;
          border-radius: 999px 999px 999px 0;
        }
      }

      @media (max-width: 767.98px) {
        h2 {
          font-size: 24px;
        }
      }
    }

    .chat-box {
      border-radius: 15px;
      background-color: white;
      height: 60vh;
      display: flex;
      flex-direction: column;

      .chat-area {
        height: 80%;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .input-area {
        border-top: 1px solid rgb(215, 215, 215);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 20%;
        padding: 20px;
      }
    }

    @media (max-width: 991.98px) {
      width: 100%;
    }
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
