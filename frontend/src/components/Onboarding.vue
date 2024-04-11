<template>
  <div class="onboarding">
    <BackButton v-if="currentQuestionIndex > 0" color="black" borderColor="#d7d7d7" @clickBack="goPrevious"/>
    <div class="question-box">
      <div class="assistant-image"></div>
      <div class="question-text">
        <div class="question-lead">
          <h2>{{ formattedQuestionLead }}</h2>
        </div>
        <div class="question">
          <h2>{{ currentQuestion.question }}</h2>
        </div>
      </div>
    </div>
    <div class="answer-box">
      <p>{{ answerPrompt }}</p>
      <div class="answers" v-if="currentQuestion.type == 'multiple-choice'">
        <div
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          :class="{ 'single-mp': true, wide: option.size === 'wide' }"
          :style="{ backgroundColor: option.color }"
          @click="selectOption(option)"
        >
          <img class="icon_question" v-if="option.icon" :src="`/images/icons/${option.icon}`" alt="arrow" />
          <div class="answer-icon" v-if="option.icon"></div>
          <p>{{ option.text }}</p>
          <img class="icon_arrow" src="@/assets/images/icons/icon_arrow.png" alt="arrow" />
        </div>
      </div>
      <div v-else>
        <InputField :iconVisible="true" placeholder="Typ uw woonplaats in" @submit="submitTextAnswer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDatastore } from '../store/Datastore';
import questions from '@/assets/data/questions.json';
import InputField from './InputField.vue';
import BackButton from './BackButton.vue';

export default defineComponent({
  name: 'Onboarding',
  data() {
    return {
      currentQuestionIndex: 0,
      questionsData: questions,
      answers: [] as Array<string>,
      input: '',
      skipQuestionnaire: false as Boolean,
    };
  },
  components: {
    InputField,
    BackButton
  },
  computed: {
    currentQuestion() {
      return this.questionsData[this.currentQuestionIndex];
    },
    formattedQuestionLead() {
      if (this.currentQuestion) {
        return this.currentQuestion.question_lead.replace('{{city}}', this.input);
      }
      return '';
    },
    answerPrompt() {
      return this.currentQuestion.type === 'text' ? 'Zoek op woonplaats' : 'Selecteer een antwoord.';
    },
  },
  methods: {
    selectOption(option: any) {
      console.log(option);
      if (option.tag as String) {
        this.answers.push(option.tag);
      }
      this.moveToNextQuestion(option);
    },
    submitTextAnswer(input: string) {
      const datastore = useDatastore();
      if (input.trim() !== '') {
        this.answers = ['medisch professional', 'Tilburg', 'Eenzaamheid'];
        this.saveAnswers();
        datastore.setMessage(input);
        this.$router.push('/chat');
      } else {
        alert('Please enter your answer.');
      }
    },
    moveToNextQuestion(option?: any) {
      if (option && option.text === 'Direct een vraag stellen') {
        this.skipQuestionnaire = true;
      }

      if (this.currentQuestionIndex < this.questionsData.length - 1) {
        if (this.skipQuestionnaire) {
          this.currentQuestionIndex = this.questionsData.findIndex((question) => question.id === 5);
        } else {
          if (this.currentQuestionIndex === 3) {
            this.saveAnswers();
            this.navigateToDashboard();
          } else {
            this.currentQuestionIndex++;
          }
        }
      } else {
        this.saveAnswers();
        this.navigateToDashboard();
      }
    },
    goPrevious() {
      if (this.currentQuestionIndex > 0) {
        if (this.currentQuestion.id === 5) {
          this.currentQuestionIndex = 0;
          this.skipQuestionnaire = false;
        } else {
          this.currentQuestionIndex--;
          this.answers.pop();
        }
      } else {
        console.log('Already at the first question.');
      }
    },
    saveAnswers() {
      const datastore = useDatastore();
      datastore.setPersona(this.answers);
    },
    navigateToDashboard() {
      this.$router.push('/dashboard');
    },
  },
});
</script>

<style scoped lang="scss">
.onboarding {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-height: 60vh;
  width: 100%;
  gap: 50px;

  .btn-back {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 18px;
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 12px;
    padding: 18px 26px 18px 26px;
    position: fixed;
    left: var(--unit);
    top: calc(9vh + var(--unit));

    &:hover {
      cursor: pointer;
    }

    img {
      width: 26px;
    }

    @media (max-width: 767.98px) {
      font-size: 14px;
      padding: 14px 20px 14px 20px;
      position: absolute;
      top: var(--unit);

      img {
        width: 20px;
      }
    }
  }

  .answer-box {
    background-color: white;
    border-radius: 15px;
    padding: 25px;
    gap: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;

    & > p {
      font-size: 18px;
      font-family: 'Poppins';
      font-weight: 400;
    }

    .answers {
      display: flex;
      gap: 15px;

      .single-mp {
        width: 100%;
        color: white;
        padding: 20px;
        border-radius: 10px;
        display: flex;
        gap: 10px;
        flex-direction: column;
        cursor: pointer;
        height: 150px;
        justify-content: space-between;

        .icon_arrow {
          width: 35px;
          align-self: flex-end;

          @media (max-width: 767.98px) {
            margin-left: auto;
          }
        }

        & > p {
          font-family: 'Poppins';
          font-size: 20px;
          font-weight: 600;
          line-height: 2rem;

          @media (max-width: 767.98px) {
            font-size: 18px;
            line-height: 1.75rem;
          }
        }

        .icon_arrow {
          height: 35px;
        }

        &.wide {
          flex-direction: row;
          align-items: center;
          height: unset;

          .icon_arrow {
            height: 35px;
            align-self: center;

            @media (max-width: 767.98px) {
              width: 35px;
              margin-left: auto;
            }
          }

          img {
            @media (max-width: 767.98px) {
              width: 50px;
            }
          }

          p {
            font-family: 'Poppins';
            font-size: 24px;
            font-weight: 600;
            width: 100%;
            line-height: 2rem;

            @media (max-width: 767.98px) {
              font-size: 18px;
              line-height: 1.75rem;
              width: 50%;
            }
          }
        }

        @media (max-width: 767.98px) {
          flex-direction: row;
          height: unset;
        }
      }

      @media (max-width: 767.98px) {
        flex-direction: column;
      }
    }
  }

  .question-box {
    display: flex;
    gap: 25px;
    justify-content: center;
    width: 100%;

    @media (max-width: 767.98px) {
      flex-direction: column;
      height: unset;

      .question-text {
        width: 100%;

        h2 {
          font-size: 24px;
        }
      }
    }
  }

  @media (max-width: 991.98px) {
    width: 100%;
    max-height: unset;
    margin-top: 8vh;
  }
}

.question-text {
  width: 70%;

  .question {
    color: var(--orange);
  }
}

.assistant-image {
  width: 120px;
  height: 120px;
  background-image: url('@/assets/images/chat_assistant.png');
  background-position: center;
  background-size: cover;
  border-radius: 999px 0 999px 999px;

  @media (max-width: 767.98px) {
    width: 80px;
    height: 80px;
    border-radius: 999px 999px 999px 0;
  }
}
</style>
