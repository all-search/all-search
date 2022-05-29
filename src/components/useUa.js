import { ref } from 'vue'
import { isMobile } from '../util/index'

export default function () {
  return {
    isMobile: ref(isMobile())
  }
}
