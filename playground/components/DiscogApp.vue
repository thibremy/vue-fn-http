<template>
  <main>
    <TheCard>
      <TheCardInfo>
        <form @submit.prevent="search">
          <input v-model="searchInput" />
        </form>
      </TheCardInfo>
    </TheCard>
    <TheCard v-if="user.json.value">
      <TheCardInfo>
        {{ user.json.value }}
      </TheCardInfo>
    </TheCard>
  </main>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'
import { useDiscogApi } from '../compositions/use-discog-api'

export default defineComponent({
  name: 'DiscogApp',
  components: {
    TheCard: defineAsyncComponent(() => import('./TheCard.vue')),
    TheCardInfo: defineAsyncComponent(() => import('./TheCardInfo.vue')),
    TheList: defineAsyncComponent(() => import('./TheList.vue')),
  },
  setup() {
    const discog = useDiscogApi()
    const user = discog.user()
    const searchInput = ref<string | null>(null)

    const search = () => {
      if (searchInput.value) {
        user.fetch(searchInput.value)
      }
    }

    return {
      searchInput,
      search,
      user,
    }
  },
})
</script>
