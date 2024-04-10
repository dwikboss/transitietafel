<template>
    <div class="question-box">
        <div class="assistant-image"></div>
        <div class="question">
            <div class="question-lead">
                <h2 v-html="formattedQuestionLead"></h2>
            </div>
            <div class="question-subtext">
                <h2>{{ currentQuestion.question }}</h2>
            </div>
        </div>
    </div>
    <div class="answer-box">
        
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'QuestionBox',
    props: {
        currentQuestion: Object
    },
    computed: {
        formattedQuestionLead() {
            if (this.currentQuestion) {
                return this.currentQuestion.question_lead.replace('{{city}}', this.answer);
            }
            return '';
        }
    },
    data() {
        return {
            answer: ''
        };
    }
});
</script>

<style lang="scss" scoped>
.question-box {
    display: flex;
    gap: 25px;
    justify-content: center;
    width: 75%;
}

.question {
    width: 70%;
}

.question-subtext {
    color: var(--orange);
}

.assistant-image {
    width: 120px;
    height: 120px;
    background-image: url('@/assets/images/chat_assistant.png');
    background-position: center;
    background-size: cover;
    border-radius: 999px 0 999px 999px;
}
</style>