<template>
  <ul
    class="as-menu"
    :class="menuClass">
    <menu-item
      class="as-menu-item"
      v-for="item in sites"
      :key="item.index"
      @show="handleMenuShow($event, item)">
      <div class="as-menu-item-title">
        <icon :name="item.name"/>
        <span v-text="item.nameZh"
              @click="handleClick(item.list[0])"
              @click.middle="handleMouseWheelClick(item.list[0])"/>
      </div>
      <transition :name="transition">
        <div class="as-subMenu-container"
             v-if="item.list && item.list.length"
             v-show="item.show">
          <ul class="as-subMenu">
            <li
              v-for="(child, index) in item.list"
              :key="index"
              v-show="child.data.visible"
              v-text="child.nameZh"
              @click="handleClick(child)"
              @click.middle="handleMouseWheelClick(child)">
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
      const keyword = this.getKeyword()
      window.location.href = item.url.replace('%s', keyword)
    },
    handleMouseWheelClick (item) {
      const keyword = this.getKeyword()
      window.open(item.url.replace('%s', keyword))
    },
    handleMenuShow (value, item) {
      item.show = value
    }
  }
}
</script>

<style lang="scss">
  @import "../../assets/common";

  .as-menu {
    flex: 1;
    width: 100%;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    border: 0;
    box-shadow: none;
    background-color: #fff;
    display: flex;

    &::before, &::after {
      display: table;
      content: "";
    }
    &::after {
      clear: both
    }

  }

  .as-menu--horizontal {
    flex-direction: row;
    .as-menu-item {
      border-bottom: 2px solid transparent;
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
      border-right: 2px solid transparent;
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
    transition: color .3s cubic-bezier(.645, .045, .355, 1), border-color .3s cubic-bezier(.645, .045, .355, 1), background .3s cubic-bezier(.645, .045, .355, 1);
    box-sizing: border-box;
    &:hover {
      border-color: var(--as-primary-color);
      .as-menu-item-icon, .as-menu-item-title {
        color: var(--as-primary-color);
      }
    }
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
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, .12),
    0 6px 16px 0 rgba(0, 0, 0, .08),
    0 9px 28px 8px rgba(0, 0, 0, .05);
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
        color: var(--as-primary-color);
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
