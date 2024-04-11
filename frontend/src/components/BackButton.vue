<template>
  <div class="btn-back" @click="clickBack" :style="{borderColor: borderColor, color: color}">
    <img v-if="color == 'black'" src="/images/icons/icon_arrow_back.png" alt="arrow_back" >
    <img v-else src="/images/icons/icon_arrow_back_white.png" alt="arrow_back" >
    Vorige
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BackButton',
  props: {
    color: String,
    borderColor: String
  },
  methods: {
    clickBack() {
      this.$emit('click-back');
    },
  },
});
</script>

<style lang="scss" scoped>
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
</style>
