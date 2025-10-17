import { ApolloClient, InMemoryCache } from '@apollo/client'
import App from './App.svelte'

// 创建Apollo Client实例
export const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})

// 创建Svelte应用实例
const app = new App({
  target: document.getElementById('app')
})

export default app