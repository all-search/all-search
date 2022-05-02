import { ref } from 'vue'
import { isMobile } from '../util'

export default function () {
  return {
    isMobile: ref(isMobile())
  }
}
