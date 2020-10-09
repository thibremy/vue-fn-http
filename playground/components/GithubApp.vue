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
import { useGithubApi } from '../compositions/use-github-api'

export default defineComponent({
  name: 'GithubApp',
  components: {
    TheCard: () => import('./TheCard.vue'),
    TheCardInfo: () => import('./TheCardInfo.vue'),
    TheList: () => import('./TheList.vue'),
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
