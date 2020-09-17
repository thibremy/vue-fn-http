<template>
  <main>
    <nav>
      <button v-text="'discog'" @click="() => navigateToApp('DiscogApp')" />
      <button v-text="'github'" @click="() => navigateToApp('GithubApp')" />
    </nav>
    <keep-alive>
      <component v-if="app" :is="app" />
    </keep-alive>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'App',
  components: {
    DiscogApp: () => import('./components/DiscogApp.vue'),
    GithubApp: () => import('./components/GithubApp.vue'),
  },
  props: {
    defaultApp: {
      type: String,
      default: 'DiscogApp',
    },
  },
  setup(props: any) {
    const currentApp = ref(props.defaultApp)

    const app = computed(() => {
      return currentApp.value
    })

    return {
      app,
      navigateToApp(appName: string) {
        currentApp.value = appName
      },
    }
  },
})
</script>
