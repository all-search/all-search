<template>
  <aside
    class="side-bar light">

    <ul>
      <li
        v-for="item in links"
        :key="item.name"
        class="side-bar-item"
      >
        <a :href="getLink(item.src)"
           target="_blank">
          <div class="icon">
            <img
              :src="item.icon"
            />
          </div>
          <span v-text="item.nameZh"></span>
        </a>
      </li>
    </ul>
    <div class="footer">
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
import { links } from '../config/sites'

export default {
  name: 'SideBar',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      links
    }
  },
  computed: {
    keyword () {
      return this.$route.query.k
    }
  },
  methods: {
    getLink (link) {
      return link.replace('{keyword}', this.keyword)
    }
  }
}
</script>

<style lang="scss">
  .side-bar {
    width: 130px;
    z-index: 20;
    text-align: left;
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
    .icon {
      display: inline-block;
      height: 16px;
      width: 16px;
      margin-right: 10px;
      min-width: 16px;
      min-height: 16px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: text-bottom;
      }
    }
  }

  .side-bar.light {
    background-color: #fff;
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, .05);
  }

  .footer {
    padding-bottom: 10px;

    .link {
      height: 28px;
      line-height: 28px;
      font-size: 13px;
      padding: 0 24px;
      &:hover {
        color: #1890ff;
      }
    }
  }

  a {
    display: block;
    margin: 0;
    text-align: left;
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
</style>
