<template>
  <div class="page home">
    <AppHeader fontColor="black" />
    <div class="full-width">
      <Onboarding />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from '../components/AppHeader.vue';
import Onboarding from '../components/Onboarding.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    AppHeader,
    Onboarding,
  },
  mounted() {
    if (localStorage.getItem('persona')) {
      this.$router.push('/dashboard');
    }
  },
});
</script>

<style lang="scss" scoped>
.page.home {
  background-color: var(--light-blue);
  height: 100vh;

  @media (max-width: 767.98px) {
    padding-bottom: 10%;
    height: unset;
  }

  .full-width {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 91vh;
    padding-top: 6%;
  }

  h1 {
    margin-top: 32px;
    margin-bottom: 16px;
    color: var(--white);
    text-align: center;
  }

  h2 {
    color: var(--white);
    font-weight: 200;
  }
}
</style>
