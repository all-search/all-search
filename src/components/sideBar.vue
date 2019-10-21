<template>
  <aside
    class="side-bar light">
    <logo />
    <el-input
      class="search-input"
      placeholder="搜索"
      v-model="localKeyword"
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
          alt=""
        />
        <span v-text="item.nameZh"></span>
      </li>
    </ul>
    <div class="footer">
      <p
        class="link"
        @click="showSetting">
        设置
      </p>
      <a
        class="link"
        href="https://github.com/endday/all-search/issues"
        target="_blank">
        反馈建议
      </a>
    </div>
  </aside>
</template>

<script>
import sites from '../config/sites'
import logo from '../components/logo'
import { getQueryString } from '../util/index'

export default {
  name: 'SideBar',
  components: {
    logo
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      sites,
      localKeyword: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.localKeyword = getQueryString('k')
    },
    handleClick (item) {
      this.$emit('menu-click', item)
    },
    handleSearch () {
      this.$emit('search', this.localKeyword)
    },
    showSetting () {
      this.$emit('open-setting')
    }
  }
}
</script>

<style lang="scss">
  .side-bar {
    width: 130px;
    z-index: 20;
    text-align: left;
    height: 100vh;
    display: flex;
    flex-direction: column;

    ul {
      flex: 1;
      list-style: none;
      padding: 15px 0;
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
      vertical-align: text-bottom;
      margin-right: 10px;
      min-width: 16px;
      min-height: 16px;
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

  .search-input {

    .el-input__inner {
      border-top: none;
      border-left: none;
      border-right: none;
      border-radius: 0;
    }
  }

  .footer {
    padding-bottom: 10px;

    .link {
      display: block;
      height: 28px;
      line-height: 28px;
      margin: 0;
      padding: 0 24px;
      text-align: left;
      font-size: 13px;
      color: rgba(0, 0, 0, .65);
      text-decoration: none;
      background-color: transparent;
      outline: 0;
      cursor: pointer;
      transition: color .3s;

      &:hover {
        color: #1890ff;
      }
    }
  }
</style>
