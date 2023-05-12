import { defineConfig } from 'unocss/vite'
import config from '@slidev/client/uno.config'

export default defineConfig({
  ...config,
  shortcuts: {
    ...config.shortcuts || {},
    'text-gradient': 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400',
  },
})