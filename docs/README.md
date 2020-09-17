Isomorphic fetch hook that should|will works with SSR (server side rendering).

```
<template>
  <div>
    <template v-if="isFetching">
        Loading...
    </template>
    <template v-if="isCompleted" v-else>
      <div>{{ text }}</div>
    </template>
  </div>
</template>

<script>
import { watch } from 'vue'
import { useFetch } from 'vue-fetch-composable'

export default {
  setup(props) {
    const { fetch, isFetching, isCompleted, abort, text } = useFetch('http://google.com')
    
    watch(() => props.search, async (search) => {
      abort()
      fetch(`?search=${search}`)
    })

    return {
      isFetching
      text
    }
  }
}
</script>
```



