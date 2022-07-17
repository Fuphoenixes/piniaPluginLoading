<h1>
  <img height="64" src="https://pinia.esm.dev/logo.svg" alt="Pinia logo">
  Pinia Plugin Loading
</h1>

Forked from [Fuphoenixes/piniaPluginLoading](https://github.com/Fuphoenixes/piniaPluginLoading)

Auto loading data binding plugin for pinia. You don't need to write showLoading and hideLoading any more.

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
      this.info = await requset('/api')
    }
  }
})
```

```vue
<template>
    <div>
       <loading :visible="store.$loading.fetchData" message="loading...">
    </div>
</template> 
<script lang="ts" setup>
import { useStore } from '@/store'
const store = useStore()
</script>
```

## License

[MIT](http://opensource.org/licenses/MIT)
