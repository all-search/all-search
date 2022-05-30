<!--
 * @Description:滚动部分
 * @User: lyy
 * @Date: 2022-05-06 10:27:31
-->
<template>
  <div
    ref="scrollbar"
    class="as-scrollbar"
  >
    <div
      ref="wrap"
      :class="[
        wrapClass,
        'as-scrollbar__wrap',
        native ? '' : 'as-scrollbar__wrap--hidden-default',
      ]"
      :style="renderWrapStyle"
      @scroll="handleScroll"
    >
      <component
        :is="tag"
        ref="resize"
        :class="['as-scrollbar__view', viewClass]"
        :style="viewStyle"
      >
        <slot />
      </component>
    </div>
    <template v-if="!native">
      <bar
        :move="moveX"
        :ratio="ratioX"
        :size="sizeWidth"
        :always="always"
      />
      <bar
        :move="moveY"
        :ratio="ratioY"
        :size="sizeHeight"
        vertical
        :always="always"
      />
    </template>
  </div>
</template>
<script>
  import {
    computed,
    defineComponent,
    nextTick,
    onMounted,
    onBeforeUnmount,
    onUpdated,
    ref,
  } from 'vue';
  import Bar from './bar.vue';
  import { isArray, toObject, addUnit, isString, addResizeListener, removeResizeListener, debugWarn, isNumber } from './util.js';
  export default defineComponent({
    components: { Bar },
    props: {
      height: { type: [String, Number], default: '', },
      maxHeight: {
        type: [String, Number], default: '',
      },
      native: { type: Boolean, default: false, },
      wrapStyle: { type: [String, Array], default: '', },
      wrapClass: { type: [String, Array], default: '', },
      viewClass: { type: [String, Array], default: '', },
      viewStyle: { type: [String, Array], default: '', },
      noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
      tag: { type: String, default: 'div', },
      always: { type: Boolean, default: false, },
      minSize: { type: Number, default: 20, },
    },
    emits: ['scroll'],
    setup(props, { emit }){
      const sizeWidth = ref('0');
      const sizeHeight = ref('0');
      const moveX = ref(0);
      const moveY = ref(0);

      const scrollbar = ref(null);
      const wrap = ref(null);
      const resize = ref(null);

      const ratioY = ref(1);
      const ratioX = ref(1);
      const SCOPE = 'AScrollbar';
      const GAP = 4; // top 2 + bottom 2 of bar instance
      // provide(
      //   scrollbar,
      //   reactive({
      //     scrollbarElement: scrollbar,
      //   })
      // );
      const renderWrapStyle = computed(() => {
        let style = props.wrapStyle;
        if (isArray(style)) {
          style = toObject(style);
          style.height = addUnit(props.height);
          style.maxHeight = addUnit(props.maxHeight);
        } else if (isString(style)) {
          style += addUnit(props.height)
            ? `height: ${addUnit(props.height)};`
            : '';
          style += addUnit(props.maxHeight)
            ? `max-height: ${addUnit(props.maxHeight)};`
            : '';
        }
        return style;
      });

      const update = () => {
        if (!wrap.value) return;

        const offsetHeight = wrap.value.offsetHeight - GAP;
        const offsetWidth = wrap.value.offsetWidth - GAP;

        const originalHeight = offsetHeight ** 2 / wrap.value.scrollHeight;
        const originalWidth = offsetWidth ** 2 / wrap.value.scrollWidth;
        const height = Math.max(originalHeight, props.minSize);
        const width = Math.max(originalWidth, props.minSize);

        ratioY.value =
          originalHeight /
          (offsetHeight - originalHeight) /
          (height / (offsetHeight - height));
        ratioX.value =
          originalWidth /
          (offsetWidth - originalWidth) /
          (width / (offsetWidth - width));

        sizeHeight.value = height + GAP < offsetHeight ? height + 'px' : '';
        sizeWidth.value = width + GAP < offsetWidth ? width + 'px' : '';
      };
      const handleScroll = () => {
        if (wrap.value) {
          const offsetHeight = wrap.value.offsetHeight - GAP;
          const offsetWidth = wrap.value.offsetWidth - GAP;

          moveY.value =
            wrap.value.scrollTop * 100 / offsetHeight * ratioY.value;
          moveX.value =
            wrap.value.scrollLeft * 100 / offsetWidth * ratioX.value;

          emit('scroll', {
            scrollTop: wrap.value.scrollTop,
            scrollLeft: wrap.value.scrollLeft,
          });
        }
      };
      const setScrollTop = value => {
        if (!isNumber(value)) {
          debugWarn(SCOPE, 'value must be a number');
          return;
        }
        wrap.value.scrollTop = value;
      };
      const setScrollLeft = value => {
        if (!isNumber(value)) {
          debugWarn(SCOPE, 'value must be a number');
          return;
        }
        wrap.value.scrollLeft = value;
      };
      onMounted(() => {
        if (!props.native) {
          nextTick(update);
        }

        if (!props.noresize) {
          addResizeListener(resize.value, update);
          addEventListener('resize', update);
        }
      });
      onBeforeUnmount(() => {
        if (!props.noresize) {
          removeResizeListener(resize.value, update);
          removeEventListener('resize', this.update);
        }
      });
      onUpdated(() => update());

      return {
        scrollbar,
        wrap,
        resize,
        moveX,
        moveY,
        ratioX,
        ratioY,
        sizeWidth,
        sizeHeight,
        update,
        handleScroll,
        scrollTo,
        setScrollTop,
        setScrollLeft,
        renderWrapStyle,
      };
    }
  });
</script>
