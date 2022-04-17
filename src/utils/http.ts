import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://172.16.1.99',
  transformResponse: [(data) => {
    return data
  }]
})

const URLS = {
  create: '/dialog/create',
  getCount: '/dialog/getCount',
  destory: '/dialog/destory',
  getContent: '/dialog/getContent'
}

function mock (type: string): Promise<Record<string, any>> {
  const MOCK: {[key: string]: any} = {
    create: {
      data: {
        content: '你好'
      }
    }
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK[type])
    }, 1000)
  })
}

export interface CreateType {
  data: Record<string, unknown>
}

export const create = (wordsId: number) => {
  return instance.post(URLS.create, { wordsId })
  // return mock('create')
}

export const getCount = (wordsId: number) => {
  return instance.post(URLS.getCount, { wordsId })
}

export const getContent = (options: Record<string, unknown>) => {
  return instance.post(URLS.getContent, options.data)
}

export const destory = (options: Record<string, unknown>) => {
  return instance.post(URLS.destory, options.data)
}
