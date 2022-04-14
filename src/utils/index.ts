import { h, render } from 'vue'

export interface Toast {
  duration?: number,
  content: string
}

export const toast = (options: Toast = { duration: 3000, content: '' }) => {
  const toast = h('div', { class: 'my-toast' }, options.content)
  const container = document.createElement('div')
  container.setAttribute('class', 'my-toast-container')
  console.log(toast)
  render(toast, container)
  document.body.appendChild(container)
  setTimeout(() => {
    document.body.removeChild(container)
  }, options.duration)
}
