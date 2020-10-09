<template>
  <section>
    <nav>
      <button v-text="'discog'" @click="() => navigateToApp('DiscogApp')" />
      <button v-text="'github'" @click="() => navigateToApp('GithubApp')" />
    </nav>
    <component v-if="app" :is="app" />
  </section>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed, ref } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    DiscogApp: defineAsyncComponent(() => import('./components/DiscogApp.vue')),
    GithubApp: defineAsyncComponent(() => import('./components/GithubApp.vue')),
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
