<template>
    <div class="cont" ref="chatWidget">
        <div v-for="(message, index) in messages" :key='index' class='message-container' :class="message.from">
            <section class="icon">
                <v-icon v-if="message.from === 'bot'" name="oi-dependabot" scale="1.5" fill="#ffffff" />
                <v-icon v-else name="fa-user" scale="1.5" fill="#3D556E" />
            </section>
            <span class="message">
                <p v-if="message.isShowed">{{ message.msg }}</p>
                <svg class="icon-animation" v-else width="30" height="15">
                    {{ getShowed(message.id) }}
                    <circle cx="5" cy="10" r="2.5" fill="#ffffff">
                        <animate attributeName="cy" values="10;5;10" dur="0.8s" />
                    </circle>
                    <circle cx="15" cy="10" r="2.5" fill="#ffffff">
                        <animate attributeName="cy" values="10;5;10" dur="0.8s" begin="0.4s" />
                    </circle>
                    <circle cx="25" cy="10" r="2.5" fill="#ffffff">
                        <animate attributeName="cy" values="10;5;10" dur="0.8s" begin="0.8s" />
                    </circle>
                </svg>
            </span>
        </div>
        <div class="options-container" v-show="showOption">
            <span @click="sendMessage(option)" class="option" v-for="(option, index) in chatOptions" :key='index'>{{
                option }}</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ChatContainer',
    data() {
        return {
            chatOptions: ['Заказать пиццу', 'Установить будильник', 'Вывести погоду'],
            messages: [],
            showOption: false
        }
    },
    mounted() {
        this.addToMessages({
            from: 'bot',
            msg: "Привет! Что я могу для Вас сделать?"
        })
    },
    methods: {
        getShowed(id) {
            const index = this.messages.findIndex(x => x.id === id);
            setTimeout(() => {
                this.messages[index].isShowed = true
                if (this.messages[index].from === 'bot') this.showOption = true
                this.scrollToBottom()
            }, 1600);

        },
        addToMessages(message) {
            if (!message.length) this.showOption = false
            this.messages.push(message);

        },
        sendMessage(userMessage) {
            this.showOption = false
            this.addToMessages({ from: 'user', msg: userMessage, id: Date.now().toString(), isShowed: false })
            setTimeout(() => {
                this.handleUserResponse(userMessage);
            }, 1600);
            this.scrollToBottom()
        },
        handleUserResponse(userMessage) {
            let botResponse = this.generateBotResponse(userMessage);
            this.addToMessages({ from: 'bot', msg: botResponse, id: Date.now().toString(), isShowed: false })
            this.scrollToBottom()
        },
        generateBotResponse(userMessage) {
            switch (userMessage) {
                case 'Заказать пиццу':
                    return 'Хорошо, я закажу пиццу. Что еще могу сделать?';
                case 'Установить будильник':
                    return 'Хорошо, будильник установлен. Чем еще помочь?';
                case 'Вывести погоду':
                    return 'Сейчас погода: солнечно. Что еще интересует?';
            }
        },
        scrollToBottom() {
            this.$nextTick(() => {
                var chatWidget = this.$refs.chatWidget;
                chatWidget.scrollTop = chatWidget.scrollHeight;
            });
        }
    }
}
</script>

<style lang="scss">
.cont {
    height: calc(80vh - 42px);
    max-height: calc(550px - 42px);
    overflow-y: auto;
    color: black;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .message-container {
        display: flex;
        gap: 10px;

        .icon {
            width: 40px;
            height: 40px;
            box-shadow: 0px 0px 8px 0px #727272;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: -webkit-linear-gradient(left, #45a5b2, #428ffa);
        }

        .message {
            padding: 8px;
            color: white;
            max-width: calc(100% - 80px);
            transition: 0.4s;
        }

        &.bot {
            .message {
                border-radius: 15px 15px 15px 0px;
                background-color: #8c6292;
            }
        }

        &.user {
            flex-direction: row-reverse;

            .message {
                border-radius: 15px 15px 0px 15px;
                background-color: #fa4299;
                text-align: right;

            }
        }
    }

    .options-container {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;

        .option {
            background-color: #428ffa;
            padding: 7px;
            color: white;
            border-radius: 20px;
            cursor: pointer;
            transition: 0.4s;

            &:hover {
                background-color: #83aae1;

            }
        }
    }
}
</style>