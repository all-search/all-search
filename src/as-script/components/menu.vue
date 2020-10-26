<template>
  <ul
    class="as-menu"
    :class="menuClass">
    <menu-item
      class="as-menu-item"
      :class="{ 'as-menu-item-active': item.show }"
      v-for="item in sites"
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
              v-show="child.data.visible"
              v-text="child.nameZh"
              @click="handleClick(child)">
            </li>
          </ul>
        </div>
      </transition>
    </menu-item>
  </ul>
</template>

<script>
import { getKeyword } from '../../util'
import menuItem from './menuItem.vue'
import icon from '../components/icon.vue'

export default {
  name: 'as-menu',
  components: {
    menuItem,
    icon
  },
  props: {
    sites: {
      type: Array,
      default () {
        return []
      }
    },
    mode: {
      type: String,
      default: 'horizontal',
      validator: val => ['horizontal', 'vertical'].includes(val)
    },
    inline: {
      type: Boolean,
      default: true
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
    }
  },
  data: () => ({
    show: false
  }),
  methods: {
    handleChange (val) {
      this.$emit('change', val)
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
      if (!this.inline) {
        item.show = value
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../assets/common";

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
    margin: 0;
    white-space: nowrap;
    border: 0;
    box-shadow: none;
    background-color: #fff;
    display: flex;
  }

  .as-menu--horizontal {
    flex-direction: row;
    .as-menu-item-active {
      border-bottom: 2px solid $active-color;
    }
    .as-subMenu-container {
      left: -22px;
      top: 24px;
    }
  }

  .as-menu--vertical {
    flex-direction: column;
    .as-menu-item {
      margin: 5px 0;
    }
    .as-menu-item-active {
      border-right: 2px solid $active-color;
    }
    .as-subMenu-container {
      left: $verticalWidth - 15px;
      top: -16px;
    }
  }

  .as-menu-item {
    height: $height;
    line-height: $height;
    list-style: none;
    position: relative;
    transition: border-color .3s cubic-bezier(.645, .045, .355, 1);
  }

  .as-menu-item-icon {
    color: $color;
    margin: 1.25px 10px 0 0;
    line-height: $height - 1.25px;
  }

  .as-menu-item-title {
    height: 100%;
    padding: 0 16px;
    position: relative;
    margin: 0;
    white-space: nowrap;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: $color;
    border-bottom: 2px solid rgba(255, 255, 255, 0);
    transition: color .3s cubic-bezier(.645, .045, .355, 1);
    &:hover {
      color: $active-color;
    }
  }

  .as-menu-item-active {
    color: $active-color;
    .as-menu-item-icon {
      color: $active-color;
    }
    .as-menu-item-title {
      color: $active-color;
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
      color: $color;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-color: #f5f7fa;
        color: $active-color;
      }
    }
  }

  .drop-enter-active, .drop-leave-active {
    transition: all 0.2s cubic-bezier(.645, .045, .355, 1);
  }

  .drop-enter, .drop-leave-to {
    opacity: 0;
    transform: scaleY(0.0001);
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 0.2s cubic-bezier(.645, .045, .355, 1);
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .as-subMenu-group-list {
    list-style: none;
    padding: 0;
    .as-menu-item-title {
      padding-left: 44px;
    }
  }
</style>
