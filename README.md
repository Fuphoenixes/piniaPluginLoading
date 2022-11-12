<h1>
  <img height="64" src="https://pinia.esm.dev/logo.svg" alt="Pinia logo">
  Pinia Plugin Loading
</h1>


Auto loading data binding plugin for pinia. You don't need to write `showLoading` or `hideLoading` any more.

## Installation

```sh
npm install pinia-plugin-loading
```
or

```sh
yarn add pinia-plugin-loading
```

## Usage

```ts
import { createPinia } from 'pinia'
import { PiniaLoading } from 'pinia-plugin-loading'
const pinia = createPinia()
pinia.use(PiniaLoading)
```

All `actions` in your stores now have a matching, reactive boolean in `$loading` that indicates whether the action is `pending` or not.

### Example

```ts
import { defineStore } from 'pinia'
export const useStore = defineStore('main', {
  state: () => {
    return {
      info: null
    }
  },
  actions: {
    async fetchData() {
      this.info = await request('/api')
    }
  }
})
```

```vue
<template>
  <div>
    <loading v-if="store.$loading.fetchData" message="Loading…" />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
const store = useStore()
</script>
```

## License

[MIT](http://opensource.org/licenses/MIT)
