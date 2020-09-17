<template>
  <main>
    <TheCard>
      <TheCardInfo> GithubUser </TheCardInfo>
    </TheCard>
    <TheList>
      <template #default="item">
        <TheCard>
          <TheCardInfo>
            {{ item }}
          </TheCardInfo>
        </TheCard>
      </template>
    </TheList>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'GithubApp',
  components: {
    TheCard: () => import('./TheCard.vue'),
    TheCardInfo: () => import('./TheCardInfo.vue'),
    TheList: () => import('./TheList.vue'),
  },
})
</script>
