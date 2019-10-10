<template>
  <el-aside
    class="side-bar light"
    width="140px">
    <el-input
      class="search-input"
      placeholder="回车搜索"
      v-model="keyword"
      @keyup.enter.native="handleSearch"
    >
      <i slot="prefix"
         class="el-input__icon el-icon-search"
         @click="handleSearch">
      </i>
    </el-input>
    <ul>
      <li
        v-for="item in sites"
        :key="item.name"
        class="side-bar-item"
        :class="{ selected: value === item.name }"
        @click="handleClick(item)"
      >
        <img
          class="icon"
          :src="item.icon"
          :alt="item.name"
        />
        <span v-text="item.nameZh"></span>
      </li>
    </ul>
  </el-aside>
</template>

<script>
import sites from '../config/sites'

export default {
  name: 'SideBar',
  props: {
    value: {
      type: String,
      default: ''
    },
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    collapseBtn () {
      if (this.isCollapse) {
        return {
          icon: 'el-icon-d-arrow-right',
          text: '展开'
        }
      }
      return {
        icon: 'el-icon-d-arrow-left',
        text: '收起'
      }
    }
  },
  data () {
    return {
      sites,
      keyword: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    changeCollapse () {
      this.$emit('changeCollapse', !this.isCollapse)
    },
    handleClick (item) {
      this.$emit('menu-click', item)
    },
    handleSearch () {
      this.$emit('search', this.keyword)
    }
  }
}
</script>

<style lang="scss">
  .side-bar {
    width: 100%;
    z-index: 20;
    text-align: left;
    height: 100vh;
    ul {
      list-style: none;
      padding-left: 0;
    }
    li {
      list-style: none;
    }
  }

  .side-bar-item {
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    padding: 0 24px;
    cursor: pointer;
    margin: 4px 0;
    transition: color .3s cubic-bezier(.645, .045, .355, 1),
    border-color .3s cubic-bezier(.645, .045, .355, 1),
    background .3s cubic-bezier(.645, .045, .355, 1),
    padding .15s cubic-bezier(.645, .045, .355, 1);
    .icon {
      height: 16px;
      width: 16px;
      background-color: #fff;
      vertical-align: middle;
      margin-right: 10px;
    }
    a {
      display: block;
      color: rgba(0, 0, 0, .65);
    }
    & > a:hover {
      color: #1890ff;
    }
    &:hover {
      color: #1890ff;
    }
    &:after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      border-right: 3px solid #1890ff;
      transform: scaleY(.0001);
      opacity: 0;
      transition: transform .15s cubic-bezier(.215, .61, .355, 1), opacity .15s cubic-bezier(.215, .61, .355, 1);
      content: "";
    }
  }

  .selected {
    background-color: #e6f7ff;
    color: #1890ff;
    position: relative;
    &:after {
      transform: scaleY(1);
      opacity: 1;
      transition: transform .15s cubic-bezier(.645, .045, .355, 1), opacity .15s cubic-bezier(.645, .045, .355, 1);
    }
  }

  .side-bar.light {
    background-color: #fff;
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, .05);
  }

  a {
    color: rgba(0, 0, 0, .65);
    text-decoration: none;
    background-color: transparent;
    outline: 0;
    cursor: pointer;
    transition: color .3s;
  }

  .search-input {
    margin-top: 10px;
    .el-input__inner {
      border-top: none;
      border-left: none;
      border-right: none;
      border-radius: 0;
    }
  }
</style>
