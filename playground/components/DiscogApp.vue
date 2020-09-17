<template>
  <main>
    <TheCard>
      <TheCardInfo> DiscogUser </TheCardInfo>
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
  name: 'DiscogApp',
  components: {
    TheCard: () => import('./TheCard.vue'),
    TheCardInfo: () => import('./TheCardInfo.vue'),
    TheList: () => import('./TheList.vue'),
  },
})
</script>
