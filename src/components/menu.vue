<template>
  <ul
    class="as-menu"
    :class="menuClass">
    <menu-item
      class="as-menu-item"
      v-for="item in engines"
      :key="item.index"
      @show="handleMenuShow($event, item)">
      <div class="as-menu-item-title">
        <icon :name="item.name"/>
        <span v-text="item.nameZh"></span>
      </div>
      <transition :name="transition">
        <div class="as-subMenu-container"
             v-show="item.show">
          <ul class="as-subMenu">
            <li
              v-for="(child, index) in item.list"
              :key="index"
              v-text="child.name"
              @click="handleClick(child)">
            </li>
          </ul>
        </div>
      </transition>
    </menu-item>
  </ul>
</template>

<script>
import { getKeyword } from '../util'
import engines from '../config/engines'
import menuItem from './menuItem'
import icon from '../components/icon'

export default {
  name: 'as-menu',
  components: {
    menuItem,
    icon
  },
  props: {
    mode: {
      type: String,
      default: 'horizontal',
      validator: val => ['horizontal', 'vertical'].includes(val)
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    menuClass () {
      return {
        'as-menu--horizontal': this.mode === 'horizontal',
        'as-menu--vertical': this.mode === 'vertical'
      }
    },
    transition () {
      if (this.mode === 'horizontal') {
        return 'drop'
      } else {
        return 'fade'
      }
    },
    nameZh () {
      const i = this.engines.findIndex(item => item.name === this.value)
      if (i > -1) {
        return this.engines[i].nameZh
      } else {
        return this.engines[0].nameZh
      }
    },
    menus () {
      const i = this.engines.findIndex(item => item.name === this.value)
      if (i > -1) {
        return this.engines[i].list.filter(item => !item.disabled)
      }
      return this.engines[0].list.filter(item => !item.disabled)
    }
  },
  data: () => ({
    engines: [],
    show: false,
    asSubMenuStyle: {
      top: 0,
      left: 0
    }
  }),
  created () {
    this.engines = engines.map(item => ({
      ...item,
      show: false
    }))
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
    },
    getKeyword () {
      if (this.$root.currentSite.keyword) {
        return this.$root.currentSite.keyword()
      } else {
        return getKeyword()
      }
    },
    handleClick (item) {
      this.$emit('click', item)
      const keyword = this.getKeyword()
      window.location.href = item.url.replace('%s', keyword)
    },
    handleMouseWheelClick (event, item) {
      const btnNum = event.button
      if (btnNum === 1) {
        const keyword = this.getKeyword()
        window.open(item.url.replace('%s', keyword))
      }
    },
    handleMenuShow (value, item) {
      item.show = value
    },
    close () {
      console.log(1)
      this.engines.forEach(item => {
        item.show = false
      })
      this.show = false
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/common";

  .as-menu {
    flex: 1;
    &::before, &::after {
      display: table;
      content: "";
    }
    &::after {
      clear: both
    }
  }

  .as-menu {
    width: 100%;
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;
    white-space: nowrap;
    border: 0;
    box-shadow: none;
    background-color: #fff;
    display: flex;
  }

  .as-menu--horizontal {
    flex-direction: row;
    .as-menu-item {
      height: $horizontalHeight;
      line-height: $horizontalHeight;
    }
    .as-subMenu-container {
      left: -22px;
      top: 24px;
    }
  }

  .as-menu--vertical {
    flex-direction: column;
    .as-menu-item {
      height: $verticalHeight;
      line-height: $verticalHeight;
    }
    .as-subMenu-container {
      left: $verticalWidth - 15px;
      top: -10px;
    }
  }

  .as-menu-item {
    list-style: none;
    position: relative;

  }

  .as-menu-item-icon {
    margin: 2px 6px 0 -2px;
  }

  .as-menu-item-title {
    padding: 0 20px;
    position: relative;
    margin: 0;
    white-space: nowrap;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;

    &:hover {
      color: $color;
      .as-menu-item-icon {
        color: $color;
      }
    }
  }

  .as-subMenu-container {
    padding: 0 20px 20px;
    position: absolute;
    z-index: 99;
    transform-origin: 30% 0 0;
  }

  .as-subMenu {
    list-style: none;
    padding: 4px 0;
    min-width: 90px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-sizing: border-box;
    margin: 10px 0;
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

  .drop-enter-active, .drop-leave-active {
    transition: all 0.2s ease-out;
  }

  .drop-enter, .drop-leave-to {
    opacity: 0;
    transform: scaleY(0.0001);
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 0.2s ease-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
