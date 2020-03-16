<template>
  <div class="all-search-select">
    <div class="content"
         @click="openValue">
      <span v-text="nameZh"></span>
    </div>
    <ul class="list"
        v-show="show">
      <li
        v-for="(item,index) in engines"
        :key="item.index"
        v-text="item.nameZh"
        @click="selectCategory(index,item)">
      </li>
    </ul>
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

  .all-search-select {
    position: relative;
    ul li {
      list-style: none;
    }

    .content {
      width: 100px;
      height: $height;
      line-height: $height;
      font-size: 14px;
      padding-left: 10px;
      position: relative;
      :after {
        position: absolute;
        right: 10px;
        top: 0;
        width: 10px;
        height: 10px;
        border: #666 solid;
        border-width: 1px 1px 0 0;
        transform: rotate(135deg);
        margin-bottom: 10px;
      }
    }
    .list {
      padding: 4px 0;
      min-width: 100px;
      border: 1px solid #e4e7ed;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      box-sizing: border-box;
      margin: 5px 0;
      position: absolute;
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
  }
</style>
