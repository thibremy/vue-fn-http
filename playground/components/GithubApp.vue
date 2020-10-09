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
import { useGithubApi } from '../compositions/use-github-api'

export default defineComponent({
  name: 'GithubApp',
  components: {
    TheCard: defineAsyncComponent(() => import('./TheCard.vue')),
    TheCardInfo: defineAsyncComponent(() => import('./TheCardInfo.vue')),
    TheList: defineAsyncComponent(() => import('./TheList.vue')),
  },
  setup() {
    const github = useGithubApi()
    const user = github.user()
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
