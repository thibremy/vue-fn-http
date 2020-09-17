<script lang="ts">
import { h, defineComponent } from '@vue/composition-api'
import { useFetch } from '../fetch'

export default defineComponent({
  name: 'FetchProvider',
  props: ['requestInfo', 'requestInit'],
  setup(props, context) {
    const fetcher = useFetch(props.requestInfo, props.requestInit)
    return () => {
      const main = context.slots.default({ ...fetcher })
      return h('div', [main])
    }
  },
})
</script>
