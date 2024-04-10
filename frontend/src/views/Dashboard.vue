<template>
  <div class="page dashboard">
    <div class="banner">
      <AppHeader fontColor="white" />
      <div class="free-question">
        <div class="input-heading">
          <div class="assistant-image"></div>
          <h2>Stel jouw vraag</h2>
        </div>
        <InputField borderStyle="none" placeholder="Type jouw vraag..." @submit="submitTextAnswer" />
      </div>
    </div>
    <div class="dashboard-main">
      <div class="body-sections">
        <div class="question container">
          <div class="container-menu">
            <div class="btn articles active">Mijn vragen</div>
            <div class="btn organizations">Veelgestelde vragen</div>
          </div>
          <div class="container-content">
            <div class="articles">
              <div class="article" v-for="(article, index) in articles" :key="index">
                <div class="article-heading">
                  <p class="article-title">{{ article.title }}</p>
                  <span>•</span><a :href="article.url" class="article-link">Bronvermelding</a>
                </div>
                <div class="article-body">
                  <p>{{ article.paragraph }}</p>
                  <img src="/images/icons/icon_chevron_right.png" alt="chevron-right" />
                </div>
              </div>
            </div>
            <button class="btn-more">Bekijk meer artikelen</button>
          </div>
        </div>
        <div class="info container">
          <div class="container-menu">
            <div class="btn articles active">Artikelen</div>
            <div class="btn organizations">Instanties & contacten</div>
          </div>
          <div class="container-content">
            <div v-if="articles.length > 0" class="articles">
              <div class="article" v-for="(article, index) in articles" :key="index">
                <div class="article-heading">
                  <p class="article-title">{{ article.title }}</p>
                  <span>•</span><a :href="article.url" class="article-link">Bronvermelding</a>
                </div>
                <div class="article-body">
                  <p>{{ article.paragraph }}</p>
                  <img src="/images/icons/icon_chevron_right.png" alt="chevron-right" />
                </div>
              </div>
              <button class="btn-more">Bekijk meer artikelen</button>
            </div>
            <div v-else class="noresults">
              <img src="/images/icons/icon_noresults.png" alt="icon_noresults" />
              <p>No results</p>
              <p>Geen resultaten</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useDatastore } from '../store/Datastore';
import type { Article } from '../interfaces/_IArticle';
import type { FAQ } from '../interfaces/_IFAQ';
import AppHeader from '../components/AppHeader.vue';
import InputField from '../components/InputField.vue';
import axios from 'axios';

export default defineComponent({
  name: 'Dashboard',
  components: {
    AppHeader,
    InputField,
  },
  data() {
    return {
      articles: [] as Article[],
      faq: [] as FAQ[],
    };
  },
  mounted() {
    this.fetchArticles();
    this.fetchFAQ();
  },
  methods: {
    async fetchArticles() {
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

        this.articles = response.data.context;
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    },
    async fetchFAQ() {
      const datastore = useDatastore();
      try {
        const persona = {
          description: datastore.getPersona[0],
          location: datastore.getPersona[1],
          interests: [datastore.getPersona[2]],
        };

        const response = await axios.post('https://avoord-transitietafel-api-acc.lwdev.nl/api/FAQ', {
          persona,
        });

        this.faq = response.data.faq;
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    },
    submitTextAnswer(input: string) {
      const datastore = useDatastore();
      if (input.trim() !== '') {
        datastore.setMessage(input);
        console.log(input);
        this.$router.push('/chat');
      } else {
        alert('Please enter your answer.');
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

    .body-sections {
      display: flex;
      gap: var(--unit);

      .container {
        padding: var(--unit);
        width: 50%;
        border-radius: 12px;
        border: 1px solid rgb(215, 215, 215);

        .container-menu {
          display: flex;
          width: 100%;
          border-bottom: 1px solid rgb(215, 215, 215);

          .btn {
            padding: 0px 20px 10px 20px;
            font-family: 'Poppins';
            font-weight: 500;

            &.active {
              font-weight: 600;
              border-bottom: 3px solid var(--blue);
            }
          }
        }

        .container-content {
          .noresults {
            margin-top: 15px;
            width: 100%;
            border-radius: 8px;
            background-color: #00000006;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 250px;
            flex-direction: column;

            img {
              margin-bottom: 10px;
            }

            p:first-of-type {
              font-family: 'Poppins';
              font-weight: 700;
            }

            p:nth-child(2) {
              font-family: 'Poppins';
            }
          }

          .articles {
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            gap: var(--unit);

            .article {
              background-color: white;
              padding: var(--unit);
              border-radius: 8px;

              .article-heading {
                display: flex;
                gap: 5px;
                margin-bottom: 5px;

                a {
                  font-family: 'Poppins';
                  color: var(--blue);
                  text-decoration: none;
                  font-weight: 400;

                  &:hover {
                    text-decoration: underline;
                  }
                }

                .article-title {
                  font-family: 'Poppins';
                  font-weight: 700;
                }
              }

              .article-body {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;

                p {
                  width: 75%;
                }

                img {
                  height: 30px;
                }
              }
            }
          }

          .btn-more {
            font-family: 'Poppins';
            width: 100%;
            border-radius: 999px;
            border: none;
            border: 1px solid black;
            background: none;
            font-weight: 500;
            padding: 8px;
          }
        }
      }
    }
  }

  .banner {
    background: rgb(34, 137, 186);
    background: radial-gradient(circle, rgba(34, 137, 186, 1) 0%, rgba(14, 107, 137, 1) 100%);
    min-height: 45vh;

    .free-question {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 35px;

      .main-input {
        width: 50vw;

        @media (max-width: 767.98px) {
          width: 100%;
        }
      }

      .input-heading {
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
          border-radius: 999px 0 999px 999px;

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

      @media (max-width: 767.98px) {
        width: 100%;
        padding-left: var(--unit);
        padding-right: var(--unit);
      }
    }
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
