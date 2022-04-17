import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { Toast } from './utils/toast'

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface State {
    wordsId: number
  }

  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>,
    $toast: (options: Toast) => void
  }
}
