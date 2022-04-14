import { h, render, App } from 'vue'

export interface Toast {
  duration?: number,
  content: string
}

export default {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  install (app: App) {
    app.config.globalProperties.$toast = toast
  }
}

export const toast = ({ duration = 3000, content = '' }: Toast) => {
  const toast = h('div', { class: 'my-toast' }, content)
  const container = document.createElement('div')
  container.setAttribute('class', 'my-toast-container')
  render(toast, container)
  document.body.appendChild(container)
  setTimeout(() => {
    document.body.removeChild(container)
  }, duration)
}
