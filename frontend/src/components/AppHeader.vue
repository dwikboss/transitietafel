<template>
  <div class="header" :style="{ borderColor: borderColor }">
    <div class="app-name">
      <img v-if="fontColor == 'black'" src="/images/icons/icon_user_black.png" alt="user_circle" />
      <img v-else src="/images/icons/icon_user_white.png" alt="user_circle" />
      <p :style="{ color: fontColor }">Transitietafel 2024 ©</p>
    </div>
    <div class="app-info" :style="{ borderColor: borderColor }">
      <img v-if="fontColor == 'black'" src="/images/icons/info.png" alt="info" />
      <img v-else src="/images/icons/icon_info_white.png" alt="info" />
      <p :style="{ color: fontColor }" class="info-text">Meer info</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppHeader',
  computed: {
    borderColor() {
      if (this.fontColor == 'black') {
        return 'rgb(215,215,215)';
      } else {
        return 'rgba(255, 255, 255, 0.45)';
      }
    },
  },
  props: {
    fontColor: String,
  },
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  background-color: #ffffff13;
  height: 9vh;
  border-bottom: 1px solid;

  @media (max-width: 767.98px) {
    height: 7vh;
  }

  .info-text {
    @media (max-width: 767.98px) {
      display: none;
    }
  }

  p {
    font-family: 'Poppins';
    font-weight: 500;
  }

  .app-name {
    display: flex;
    align-items: center;
    gap: 15px;
    height: 100%;
    padding-left: var(--unit);

    img {
      width: 24px;
    }
  }

  .app-info {
    display: flex;
    align-items: center;
    gap: 15px;
    height: 100%;
    padding-right: var(--unit);
    padding-left: var(--unit);
    border-left: 1px solid;
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
  font-weight: 200;
}
</style>
