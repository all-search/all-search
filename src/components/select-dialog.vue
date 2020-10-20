<template>
  <v-dialog
    :value="visible"
    @input="visibleChange"
    scrollable
    max-width="60vw">
    <v-card>
      <v-card-title>添加网址</v-card-title>
      <v-divider/>
      <v-card-text style="height: 60vh;">
        <v-list>
          <v-list-group
            v-for="group in sites"
            :key="group.name"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="group.nameZh"/>
              </v-list-item-content>
            </template>
            <v-list-item
              class="grey lighten-4"
              v-for="(site, j) in group.list"
              :key="j"
              :value="site"
            >
              <v-list-item-content>
                <v-list-item-title v-text="site.nameZh"/>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox
                  v-model="selected"
                  :value="site"
                />
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" text @click="visibleChange(false)">取消</v-btn>
        <v-btn color="primary" text @click="confirm">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import sites from '../config/sites'

export default {
  name: 'select-dialog',
  model: {
    prop: 'visible',
    event: 'input'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      sites,
      selected: []
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.selected = JSON.parse(JSON.stringify(this.list))
      }
    }
  },
  computed: {
    personalList () {
      const i = this.sites.findIndex(item => item.name === 'personal')
      return this.sites[i].list
    }
  },
  methods: {
    visibleChange (value) {
      this.$emit('input', value)
    },
    isChecked (id) {
      return this.personalList.indexOf(item => item.id === id) > -1
    },
    handleChecked (value, item) {
      const i = this.selected.findIndex(j => j.id === item.id)
      if (!value && i > -1) {
        this.selected.splice(i, 1)
      }
      if (value && i === -1) {
        this.selected.push(item)
      }
    },
    confirm () {
      this.$emit('confirm', this.selected)
      this.visibleChange(false)
    }
  }
}
</script>

<style scoped>

</style>
