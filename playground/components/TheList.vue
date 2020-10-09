<template>
  <div>
    <template v-for="item in items">
      <slot v-bind="item" />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'TheList',
  props: {
    items: {
      type: Array,
    },
  },
  setup(props) {
    const list = computed(() => {
      return props.items
    })

    return {
      list,
    }
  },
})
</script>
