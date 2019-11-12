<template>
  <view
    :class="'uni-icon-' + type"
    :style="{ color: color, 'font-size': size + 'px' }"
    class="uni-icon"
    @click="_onClick"
  />
</template>

<script>
export default {
  name: 'UniIcons',
  props: {
    type: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#333333'
    },
    size: {
      type: [Number, String],
      default: 16
    }
  },
  methods: {
    _onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style>
	@import url("uni-icons.css");
</style>
