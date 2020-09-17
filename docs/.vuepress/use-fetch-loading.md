# UseFetchLoading

Returns a boolean `Ref` which is `true` if at least one of the queries used by the component is loading.

## usage

Example:

```vue
<script>
import { useFetch, useFetchLoading } from 'vue-fetch-composable'

export default {
  setup () {
    const one = useFetch(...)
    const second = useFetch(...)
    const loading = useFetchLoading()

    return {
      one,
      two,
      loading,
    }
  }
}
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    {{ one }}
    {{ two }}
  </div>
</template>
```
