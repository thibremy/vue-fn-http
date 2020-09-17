import { defineComponent } from '@vue/composition-api'
import { withKnobs, text } from '@storybook/addon-knobs'
import { useFetch } from './use-fetch'

const FetchStory = defineComponent({
  name: 'FetchStory',
  props: ['baseUrl'],
  setup(props) {
    const fetcher = useFetch(props.baseUrl)
    return { fetcher }
  },
  template: `
    <main>
      <section>
        <slot v-bind="fetcher">
          <button @click="() => fetcher.fetch()" v-text="'run'" />
        </slot>
      </section>
      <section>
        <code> {{ fetcher }} </code>
      </section>
    </main>
  `,
})

export default {
  component: FetchStory,
  title: 'UseFetch',
  decorators: [withKnobs],
}

export const defaults = () => ({
  components: { FetchStory },
  props: {
    baseUrl: {
      default: text('url', 'https://reqres.in/api/users'),
    },
  },
  template: '<FetchStory :base-url="baseUrl" />',
})

export const abort = () => ({
  components: { FetchStory },
  props: {
    baseUrl: {
      default: text('url', 'https://reqres.in/api/users?delay=5'),
    },
  },
  template: `
    <FetchStory>
      <template #default="{ fetch, abort } ">
        <button @click="() => fetch(baseUrl)" v-text="'run'" />
        <button @click="() => abort()" v-text="'abort'" />
      </template>
    </FetchStory>
  `,
})
