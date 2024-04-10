<template>
    <div class="main-input" :style="{borderStyle: borderStyle}">
        <img v-if="iconVisible" src="/images/icons/icon_search.png" alt="search_icon">
        <input v-model="input" type="text" :placeholder="placeHolder">
        <button @click="submit"><span class="button-text">Verstuur</span><img src="@/assets/images/icons/icon_arrow.png"
                alt="arrow"></button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'InputField',
    props: {
        placeHolder: String,
        iconVisible: Boolean,
        borderStyle: String
    },
    data() {
        return {
            input: ''
        };
    },
    methods: {
        submit() {
            if (this.input.trim() !== '') {
                this.$emit('submit', this.input.trim());
                this.input = '';
            } else {
                alert('Typ iets in.');
            }
        }
    }
});
</script>

<style scoped lang="scss">
.main-input {
    display: flex;
    border: 1px solid black;
    border-radius: 999px;
    height: 50px;
    align-items: center;
    padding: 3px 3px 3px 25px;
    background: white;

    img {
        height: 20px;
        margin-right: 15px;
    }

    input {
        border: none;
        width: 100%;
        height: 100%;
        background: none;
    }

    button {
        background-color: var(--orange);
        border: none;
        height: 100%;
        width: 200px;
        border-radius: 999px;
        color: white;
        font-family: 'Poppins';
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        .button-text {
            @media (max-width: 767.98px) {
                display: none;
            }
        }

        &:hover {
            cursor: pointer;
        }

        img {
            margin: 0;
        }

        @media (max-width: 767.98px) {
            width: 60px;
        }
    }
}
</style>