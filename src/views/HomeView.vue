<template>
  <div class="home ft24 flex fd-c ai-c">
    <div class="welcome flex flex-1 jc-c ai-c fd-c">
      <div class="icom">
        <img class="logo" src="../assets/Smile.png" alt="">
      </div>
      <div class="label ft40 fw-b">
        欢迎来到AI测试小助手
      </div>
    </div>
    <div class="footer c-fff flex jc-c ai-c ft30" @click="routerToChat()">
      开始
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  methods: {
    routerToChat () {
      this.$router.push('/conversation').catch((err) => { console.log('err', err) })
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  background: #fafafa
}

.logo {
  width: 1rem;
  height: 1rem
}

.label {
  margin-top: 0.2rem
}
.welcome {

}

.footer {
  height: 1rem;
  width: 80%;
  margin-bottom: 0.6rem;
  border-radius: 0.5rem;
  // background: #409EFF
  background: linear-gradient(to right, #2193b0, #6dd5ed)
}
</style>
