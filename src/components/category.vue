<template>
  <div class="as-select">
    <div class="as-select-content"
         @click="openValue">
      <span v-text="nameZh"></span>
    </div>
    <ul class="as-select-list"
        :class="{ fadeInDown: show }"
        v-show="show">
      <li
        v-for="(item,index) in engines"
        :key="item.index"
        v-text="item.nameZh"
        @click="selectCategory(index,item)">
      </li>
    </ul>
    <div class="as-select-mask"
         @click="show = false"
         v-show="show">
    </div>
  </div>
</template>

<script>
import engines from '../config/engines'

export default {
  name: 'category',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      engines,
      show: false
    }
  },
  computed: {
    nameZh () {
      const i = this.engines.findIndex(item => item.name === this.value)
      if (i > -1) {
        return this.engines[i].nameZh
      } else {
        return this.engines[0].nameZh
      }
    }
  },
  methods: {
    handleChange (val) {
      this.$emit('change', val)
    },
    openValue () {
      this.show = !this.show
    },
    selectCategory (index, item) {
      this.handleChange(item.name)
      this.show = false
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/common";

  .as-select {
    position: relative;
    ul li {
      list-style: none;
    }
  }

  .as-select-content {
    width: 65px;
    height: $height;
    line-height: $height;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    &::after {
      content: ' ▾';
      position: absolute;
      right: 10px;
      font-size: 24px;
      color: #999;
    }
  }

  .as-select-list {
    padding: 4px 0;
    min-width: 90px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-sizing: border-box;
    margin: 5px 0;
    position: absolute;
    right: -4px;
    z-index: 99;
    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }

  .as-select-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
</style>
