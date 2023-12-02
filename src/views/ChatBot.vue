<template>
    <div class="wrapper" v-if="showModal">
        <header>
            Let's Chat!
        </header>
        <ChatContainerVue />
    </div>
    <div class="chat-btn" @click="showModal = !showModal">
        <v-icon class="chat-icon" :class="showModal ? 'show' : ''" name="io-close" scale="1.5" fill="#ffffff" />
        <v-icon class="chat-icon" :class="!showModal ? 'show' : ''" name="co-messenger" scale="1.5" fill="#ffffff" />
    </div>
</template>

<script>
import ChatContainerVue from '../components/ChatContainer.vue'
export default {
    name: 'ChatBot',
    data() {
        return {
            showModal: false
        }
    },
    components: {
        ChatContainerVue
    }
}
</script>

<style lang="scss">
.wrapper {
    position: absolute;
    right: 30px;
    bottom: 85px;
    width: 80vw;
    max-width: 350px;
    max-height: 550px;
    height: 80vh;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px 15px 5px 5px;

    header {
        border-radius: 15px 15px 0 0;
        padding: 5px 20px;
        font-weight: 500;
        font-size: 20px;
        background: -webkit-linear-gradient(left, #a445b2, #fa4299);
        color: white;
        box-shadow: 0px 19px 20px 0px #00000040;
    }
}

.chat-btn {
    position: absolute;
    right: 25px;
    bottom: 20px;
    width: 50px;
    height: 50px;
    background: -webkit-linear-gradient(left, #a445b2, #fa4299);
    border-radius: 50%;
    transition: 0.4s;
    cursor: pointer;

    &:hover {
        box-shadow: 0px 0px 8px 0px #4b4b4b;
    }

    .chat-icon {
        transform: translate(-50%, -50%);
        transition: all 0.3s;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;

        &.show {
            opacity: 1;

        }
    }
}
</style>