<template>
  <div class="chat flex fd-c">
    <div class="content flex flex-1 fd-c ft30" ref="$content">
      <div class="chat-container flex" :class="item.role === 'self' ? 'self-container' : 'robot-container'" v-for="item in chatList" :key="item.content">
        <div v-if="item.role === 'self'" class="item self flex jc-c ai-c">
          <img class="avatar" src="../assets/default.png" alt="">
          <div class="con flex jc-c ai-c">{{item.content}}</div>
        </div>
        <div v-else class="item robot flex jc-c ai-c">
          <img class="avatar" src="../assets/Smile.png" alt="">
          <div class="loading con flex jc-c ai-c" v-if="item.type === 'loading'">
            <div class="dot loading-spinner"></div>
            <div class="dot loading-spinner"></div>
            <div class="dot loading-spinner"></div>
            <div class="dot loading-spinner"></div>
          </div>
          <div v-else class="con flex jc-c ai-c">{{item.content}}</div>
        </div>
      </div>
    </div>
    <div class="handle-bar flex ft30" v-if="!reStart">
      <div class="btn" @click="reset()">重置</div>
      <div class="btn" @click="clearChat()">清空聊天窗口</div>
      <div class="btn" @click="stopChat()">结束对话</div>
    </div>
    <div class="score"></div>
    <div v-if="reStart" class="footer ft30 flex jc-c ai-c">
      <div class="re-start c-fff flex jc-c ai-c" @click="routerToHome()">重新开始</div>
    </div>
    <div v-else class="footer ft30 flex jc-c ai-c">
      <!-- <el-input class="ft30" v-model="chatMsg" placeholder="请输入内容"></el-input> -->
      <div contenteditable  class="input flex-1 flex ai-c ft30" :placeholder="placeholderVisible ? placeholder : ''" ref="input" @keyup="checkMsg()"></div>
      <div class="send c-fff ft30 flex jc-c ai-c" @click="send()">发送</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { create, getContent } from '../utils/http'
import { toast } from '../utils'

interface ChatItem {
  role: string,
  content?: string,
  type?: string
}

export default defineComponent({
  data () {
    return {
      chatList: [] as ChatItem[],
      chatMsg: '',
      placeholder: '请输入内容',
      placeholderVisible: false,
      wordsId: 0 as number,
      reStart: false
    }
  },
  mounted () {
    this.wordsId = Number(localStorage.getItem('wordsId'))
    this.createChat()
  },
  methods: {
    send () {
      if (!this.chatMsg) {
        this.$toast({ content: '请输入内容' })
        return
      }
      this.chatList.push({
        role: 'self',
        type: 'chat',
        content: this.chatMsg
      })
      this.chatList.push({
        role: 'robot',
        type: 'loading'
      })

      this.$nextTick(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.$refs.input.innerText = ''
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.$refs.$content.scrollTop = this.$refs.$content.scrollHeight
      })
    },
    checkMsg () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.chatMsg = this.$refs.input.innerText
      if (!this.chatMsg) {
        this.placeholderVisible = true
      } else {
        this.placeholderVisible = false
      }
    },
    createChat () {
      create(this.wordsId).then(res => {
        console.log('createChat1', res)
        this.chatList.push({
          role: 'robot',
          content: res.data.content,
          type: 'chat'
        })
      })
    },
    clearChat () {
      this.chatList = []
    },
    reset () {
      this.clearChat()
      this.createChat()
    },
    stopChat () {
      this.reStart = true
      this.chatList.push({
        role: 'self',
        type: 'chat',
        content: '结束对话'
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.$refs.$content.scrollTop = this.$refs.$content.scrollHeight
      setTimeout(() => {
        this.chatList.push({
          role: 'robot',
          type: 'chat',
          content: '好的，我们下次再见！'
        })
      }, 800)
    },
    routerToHome () {
      this.$router.push('/')
    }
  }
})

</script>

<style lang="less" scoped>
.chat {
  background: #f0f0f0;
  height: 0;
}
.content {
  padding: 0.3rem 0.2rem;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 0;
}
.chat-container:not(:first-child) {
  margin-top: 0.2rem
}

.chat-container {
  .item {
    .con{
      padding: 0.1rem 0.2rem;
      max-width: 80%;
      border-radius: 0.08rem;
      min-height: 0.7rem;
      max-width: 70vw;
      word-break: break-all;
    }
    .avatar {
      width: 0.7rem;
      height: 0.7rem
    }
  }
}

.self-container {
  flex-direction: row-reverse;
  .item {
    flex-direction: row-reverse;
    .avatar {
      margin-left: 0.2rem
    }
    .con {
      background: #2193b0;
      color:#ffffff
    }
  }
}
.robot-container {
  .avatar {
    margin-right: 0.2rem
  }
  .con {
    background: #ffffff;
  }
  .loading {
    .dot {
      height: 0.1rem;
      width: 0.1rem;
      border-radius: 0.1rem;
      margin-right: 0.05rem;
      background: #2193b0;
      animation: loading-spinner 1.5s infinite ;
    }
    .dot:nth-child(1) {
      animation-delay: -0.9s;
    }:nth-child(2) {
      animation-delay: -0.6s;
    }:nth-child(3) {
      animation-delay: -0.3s;
    }:nth-child(4) {
      // animation-delay: -0.6s;
    }
  }
}

.handle-bar {
  padding: 0.2rem;
  .btn {
    margin-right: 0.2rem;
    padding: 0.1rem;
    height: 0.6rem;
    border-radius: 0.08rem;
    background: #2193b0;
    color: #fff
  }
}
.footer {
  // height: 1.2rem;
  padding: 0.4rem 0.2rem;
  background: #eeeeee;
  border-top: 0.01rem solid #cccccc;
  .input {
    background: #fff;
    border-radius: 0.16rem;
    min-height: 0.8rem;
    line-height: 0.4rem;
    max-height: 1.6rem;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0.2rem 0.25rem;
    border: none;
    outline: none;
    word-break: break-all;
    word-wrap: break-word;
  }
  .input:empty::before {
    color: #cccccc;
    content: attr(placeholder)
  }
  .send {
    margin-left: 0.2rem;
    width: 1.5rem;
    height: 0.6rem;
    background: #2193b0;
    // background: linear-gradient(to right, #2193b0, #6dd5ed);
    border-radius: 0.3rem
  }
  .re-start {
     background: #2193b0;
     height: 0.6rem;
     border-radius: 0.3rem;
     padding: 0.2rem 0.25rem
  }
}

@keyframes loading-spinner {
  0% {transform: scale(0);}
  100% {transform: scale(1);}
}
</style>
