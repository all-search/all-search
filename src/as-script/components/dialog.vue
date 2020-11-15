<template>
  <div class="as-dialog"
       v-show="visible">
    <div class="as-dialog-container"
         :style="style">
      <div class="as-dialog__header">
        <p v-text="title"></p>
        <span class="as-dialog__close"
              @click="handleClose">
        </span>
      </div>
      <div class="as-dialog__body">
        <slot></slot>
      </div>
      <div class="as-dialog__footer"></div>
    </div>
    <div class="as-dialog__mask"
         @click="handleClose"></div>
  </div>
</template>

<script>
export default {
  name: 'as-dialog',
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  },
  computed: {
    style () {
      const obj = {}
      if (this.width) {
        obj.width = this.width
      }
      return obj
    }
  },
  methods: {
    handleClose () {
      this.$emit('change', false)
    }
  }
}
</script>

<style lang="scss">
  .as-dialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    &__mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: .5;
      background: #000;
    }

    &-container {
      position: relative;
      background: #fff;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
      box-sizing: border-box;
      min-width: 50%;
      z-index: 99;
      margin: 40vh auto 50px;
      transform: translateY(-40%);
    }

    &__header {
      padding: 20px 20px 10px;
      position: relative;
      p {
        margin: 0;
        line-height: 24px;
        height: 24px;
      }
    }

    &__body {
      padding: 30px 20px;
      color: #666;
      font-size: 14px;
      word-break: break-all;
    }

    &__footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
    }

    &__close {
      display: inline-block;
      position: absolute;
      top: 16px;
      right: 24px;
      padding: 0;
      background: transparent;
      cursor: pointer;
      font-size: 16px;
      color: #909399;
      &:before {
        content: "\2716";
      }
    }
  }
</style>
