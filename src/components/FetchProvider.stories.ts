import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import { withKnobs, text  } from '@storybook/addon-knobs'
import FetchProvider from './FetchProvider.vue'

Vue.use(VueCompositionApi)

export default {
  component: FetchProvider,
  title: 'FetchProvider',
  decorators: [withKnobs],
}

export const basicInput = () => ({
  components: { FetchProvider },
  props: {
    requestInfo: {
      default: text('url', 'https://jsonplaceholder.typicode.com/todos'),
    },
  },
  template: `
    <FetchProvider :requestInfo="requestInfo">
      <template #default />
        <button v-text="'run'" />
      </template>
    </FetchProvider>
  `,
})
