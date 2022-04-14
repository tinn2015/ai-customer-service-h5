<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <div class="container flex fd-c">
    <header class="flex jc-sb header">
      <div class="ft30">话术名称：xx</div>
      <div class="ft30">已测xx次</div>
    </header>
    <router-view class="flex flex-1" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getCount } from './utils/http'

export default defineComponent({
  data () {
    return {
      testTimes: 0
    }
  },
  beforeCreate () {
    this.$store.dispatch('setWordsId', '1111')
    getCount('111').then(res => {
      this.testTimes = res.data
    })
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%
}

.container {
  height: 100%;
}

.header {
  background: #2193b0;
  padding: 0.1rem 0.25rem;
  height: 0.7rem;
  color: #fff
}

</style>
