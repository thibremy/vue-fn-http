<template>
  <main>
    <TheCard>
      <TheCardInfo>
        <form @submit.prevent="search">
          <input v-model="searchInput" />
        </form>
      </TheCardInfo>
    </TheCard>
    <TheCard v-if="user.json">
      <TheCardInfo>
        {{ user.json }}
      </TheCardInfo>
    </TheCard>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useDiscogApi } from '../compositions/use-discog-api'

export default defineComponent({
  name: 'DiscogApp',
  components: {
    TheCard: () => import('./TheCard.vue'),
    TheCardInfo: () => import('./TheCardInfo.vue'),
    TheList: () => import('./TheList.vue'),
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
