<template>
  <v-card
    :elevation="0"
    class="">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <v-row align="center" no-gutters>
              <v-col class="grow">
                应用版本
              </v-col>
              <v-col class="shrink">
                {{tmVersion}}
              </v-col>
            </v-row>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>菜单方向</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-radio-group
            :value="mode"
            @change="changeMode"
            row
          >
            <v-radio
              label="竖向"
              value="vertical"
            />
            <v-radio
              label="横向"
              value="horizontal"
            />
          </v-radio-group>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { getSession, setSession } from '../util'
import store from '../util/store'
import pkg from '../../package.json'

export default {
  name: 'setting',
  data: () => ({
    tmVersion: store.tmVersion,
    version: pkg.version,
    mode: 'horizontal'
  }),
  mounted () {
    this.mode = getSession('mode') || 'horizontal'
  },
  methods: {
    changeMode (value) {
      setSession('mode', value)
      this.mode = value
    }
  }
}
</script>
<style>

</style>
