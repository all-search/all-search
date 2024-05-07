import { reactive, watch } from 'vue'
import useSites from '../components/useSites'
import { list } from './loadList.js'
import { routerChange } from '../util/routerChange'

const { sites } = useSites('tm')

function getMenuItem () {
  let targetItem = null
  let urlObj = null
  const curItem = new URL(window.location.href)
  sites.value.some(category => {
    category.list.find(item => {
      const menuItem = new URL(item.url)
      if (
        menuItem.hostname === curItem.hostname &&
        menuItem.pathname === curItem.pathname
      ) {
        targetItem = item
        urlObj = menuItem
        return true
      }
      return false
    })
  })
  if (urlObj) {
    for (const key of urlObj.searchParams.keys()) {
      if (!curItem.searchParams.has(key)) {
        targetItem = null
      }
    }
  }
  return targetItem
}

function getSite () {
  const target = list
    .find(item => item.url.test(window.location.href.toLowerCase()))
  const menuItem = getMenuItem()
  if (target) {
    return {
      url: target.url,
      invisible: !!target.invisible,
      disabled: !!target.disabled,
      style: target.style,
      selectors: target.selectors,
      query: target.query
    }
  } else if (menuItem) {
    return {
      url: menuItem.url,
      invisible: false,
      disabled: false,
      style: menuItem.style,
      selectors: menuItem.selectors,
      query: menuItem.query
    }
  }
  return {
    url: '',
    invisible: true,
    disabled: true,
    style: {},
    selectors: null,
    query: null
  }
}

watch(sites, () => {
  updateCurrentSite()
})

function updateCurrentSite () {
  const newSite = getSite()
  Object.keys(site).forEach(key => {
    site[key] = newSite[key] || ''
  })
}

routerChange(() => {
  updateCurrentSite()
})

export let site = reactive(getSite())
