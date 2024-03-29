<template>
  <popper-comp
    :placement="placement"
    popper-class="as-subMenu-container">
    <template #trigger="{ show, hide }">
      <a class="as-menu-item no-underline"
         :class="classList"
         ref="categoryRef"
         @mouseenter="show($event.target)"
         @mouseleave="hide"
         href="javascript:void 0"
         @click.exact="handleCateClick(item, false)"
         @click.ctrl.exact="handleCateClick(item, true)"
         @click.middle.exact="handleCateClick(item, true)">
        <icon :name="item.name"/>
        <span
          class="as-menu-item-title"
          v-text="item.nameZh">
        </span>
      </a>
    </template>
    <ul class="as-subMenu">
      <li
        v-for="(child, i) in item.list"
        :key="`${item.name}_${i}`"
        v-show="child.data.visible">
        <a href="javascript:void 0"
           @click.exact="handleClick(child)"
           @click.ctrl.exact="handleClick(child, true)"
           @click.middle.exact="handleClick(child, true)">
          <favicon
            class="as-url-icon"
            :url="child.url"
            :icon="child.icon"
          />
          <p class="as-subMenu-text"
             v-text="child.nameZh">
          </p>
        </a>
      </li>
    </ul>
  </popper-comp>
</template>

<script>
import { computed, ref } from 'vue'
import popperComp from './popper'
import { site } from '../config/siteInfo.js'
import { getQueryString } from '../util/index'
import { getKeyword } from '../util/getKeyword'
import icon from './icon'
import favicon from './favicon'
import { onTap } from '../util/tap'
import { selection } from './selection'

let isTap = false

export default {
  name: 'menuItem',
  components: {
    popperComp,
    icon,
    favicon
  },
  props: {
    item: {
      type: Object
    },
    mode: {
      type: String,
      default: 'horizontal'
    }
  },
  setup (props) {
    const categoryRef = ref(null)
    const currentSite = site
    const classList = computed(() =>
      props.mode === 'horizontal' ? 'horizontal' : 'vertical'
    )
    const placement = computed(() =>
      props.mode === 'horizontal' ? 'bottom-start' : 'right-start'
    )

    const handleMenuShow = (value, item) => {
      item.show = value
    }
    const defaultKeyword = () => {
      if (selection && selection.value) {
        return selection.value
      }
      let keyword = getKeyword()
      const selectors = currentSite.selectors
      const query = currentSite.query
      if (keyword === undefined) {
        if (selectors) {
          const el = document.querySelector(selectors)
          keyword = el ? el.value : ''
        } else if (query) {
          query.some(name => {
            const word = getQueryString(name)
            keyword = word
            return !!word
          })
        }
      }
      return keyword
    }
    const handleCateClick = (cate, newWin) => {
      if (isTap) {
        return
      }
      const urlItem = cate.list
        .filter(item => item.data.visible)
        .find(item => item.url.indexOf(window.location.hostname) === -1)
      return handleClick(urlItem, newWin)
    }
    const handleClick = (item, newWin) => {
      const keyword = defaultKeyword()
      if (newWin) {
        window.open(item.url.replace('%s', keyword))
      } else {
        window.location.href = item.url.replace('%s', keyword)
      }
      return false
    }

    onTap(categoryRef, () => {
      isTap = true
    })

    return {
      placement,
      classList,
      handleMenuShow,
      handleClick,
      handleCateClick,
      categoryRef
    }
  }
}
</script>
<style lang="scss">
@import "../assets/common";

.as-menu-item.horizontal {
  position: relative;
  padding: 0 16px;

  &::after {
    content: "";
    transform: scaleX(0);
    opacity: 0;
    transition: transform .15s cubic-bezier(.645, .045, .355, 1), opacity .15s cubic-bezier(.645, .045, .355, 1);
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    border-bottom: 2px solid var(--as-primary-color);
  }

  &:hover::after {
    transform: scaleX(1);
    opacity: 1;
  }
}

@media screen and (max-width: 750px) {
  .as-menu-item.horizontal {
    padding: 0 10px;
  }
}

.as-menu-item.vertical {
  margin: 5px 0;
  position: relative;

  &::after {
    content: "";
    transform: scaleY(0);
    opacity: 0;
    transition: transform .15s cubic-bezier(.645, .045, .355, 1), opacity .15s cubic-bezier(.645, .045, .355, 1);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    border-right: 2.5px solid var(--as-primary-color);
  }

  &:hover::after {
    transform: scaleY(1);
    opacity: 1;
  }

  .as-menu-item-title {
    margin-right: 6px;
  }
}

.as-menu-item.no-underline {
  text-decoration: none;
}

.as-menu-item:visited {
  color: var(--as-primary-text-color);
}

a.as-menu-item {
  height: $height;
  line-height: $height;
  list-style: none;
  position: relative;
  color: var(--as-primary-text-color);
  transition: color .3s cubic-bezier(.645, .045, .355, 1), border-color .3s cubic-bezier(.645, .045, .355, 1), background .3s cubic-bezier(.645, .045, .355, 1);
  box-sizing: border-box;
  margin: 0;
  white-space: nowrap;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: var(--as-primary-color);

    .as-menu-item-icon, .as-menu-item-title {
      color: var(--as-primary-color);
    }
  }
}

.as-menu-item-icon {
  color: var(--as-primary-text-color);
}

.as-url-icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

.as-subMenu-container {
  background: var(--as-bg-color);
  border: 1px solid #e4e7ed;
  box-shadow: 0 0 12px rgba(0, 0, 0, .12);
  border-radius: 4px;
}

.as-subMenu {
  list-style: none;
  padding: 0;
  min-width: 90px;
  box-sizing: border-box;
  margin: 4px 0;

  li {
    overflow: hidden;
    box-sizing: border-box;

    a {
      display: flex;
      align-items: center;
      height: 34px;
      padding: 0 16px;
      text-decoration: none;
    }

    &:hover {
      background-color: var(--as-secondary-background-color);
      color: var(--as-primary-color);
    }
  }

  .as-subMenu-text {
    flex: 1;
    font-size: 14px;
    text-overflow: ellipsis;
    color: var(--as-primary-text-color);
    white-space: nowrap;
    margin: 0;
    line-height: 34px;
    font-weight: normal;
    text-align: left;
  }
}
</style>
