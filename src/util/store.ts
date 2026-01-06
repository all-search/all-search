import { reactive } from 'vue'

export interface Store {
  tmVersion: string;
}

export default reactive<Store>({
  tmVersion: ''
})
