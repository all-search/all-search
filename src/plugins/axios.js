import Vue from 'vue'
import Axios from 'axios'

Axios.defaults.headers = {
  'Content-type': 'application/x-www-form-urlencoded'
}

Vue.prototype.$http = Axios
