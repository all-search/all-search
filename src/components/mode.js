import { ref } from 'vue'
import { getSession } from '../util'

const session = getSession('mode')
let mode = session
if (['vertical', 'horizontal'].indexOf(session) === -1) {
  mode = 'horizontal'
}

export default ref(mode)
