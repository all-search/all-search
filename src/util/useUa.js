import { ref } from 'vue'
import { isMobile } from './index'

export default function () {
  return {
    isMobile: ref(isMobile())
  }
}
