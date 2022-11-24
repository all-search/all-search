import { createApp } from 'vue'
import index from './index'
import {
  createAsRoot,
  getAsRoot,
  passTmMethods
} from '../util/index'

passTmMethods()
const el = getAsRoot()

if (!el) {
  const app = createApp(index)
  const el = createAsRoot()
  const mountEL = document.documentElement.insertBefore(el, document.body)
  app.mount(mountEL)
}
