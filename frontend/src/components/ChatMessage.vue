<template>
  <div :class="messageClass">
    <div class="message-wrapper">
      <p>{{ chat.message }}</p>
    </div>
    <div class="user-ident">
      <div class="chat-img"></div>
      <p>Antwoord:</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { ChatIdent } from '../interfaces/_IChatIdent';

export default defineComponent({
  name: 'ChatMessage',
  props: {
    chat: {
      type: Object as () => ChatIdent,
      required: true,
    },
  },
  computed: {
    messageClass(): string {
      return this.chat.user ? 'chat-message user' : 'chat-message assistant';
    },
  },
});
</script>

<style lang="scss" scoped>
.chat-message {
  display: flex;

  &.assistant {
    flex-direction: column-reverse;
    gap: 15px;

    .user-ident {
      display: flex;
      align-items: center;
      p {
        color: var(--orange);
        font-family: 'Poppins';
        font-weight: 600;
      }
    }

    .chat-img {
      background-image: url('/images/icons/assistant.png');
    }
  }

  &.user {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    .user-ident {
      p {
        display: none;
      }
    }

    .chat-img {
      background-image: url('/images/icons/avatar.png');
      width: 35px;
      height: 35px;
    }

    .message-wrapper {
      display: flex;
      gap: 10px;
      p {
        background-color: var(--light-blue);
        padding: 15px;
        border-radius: 8px 0 8px 8px;
      }
    }
  }

  .chat-img {
    width: 35px;
    height: 35px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
}
</style>
