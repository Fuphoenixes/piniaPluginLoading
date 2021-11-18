<h1>
  <img height="64" src="https://pinia.esm.dev/logo.svg" alt="Pinia logo">
  Pinia Plugin Loading
</h1>

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
        const res = await requset('/api')
        this.info = res.data
    }
  }
})
```

```vue
<template>
    <div>
       <loaing :visible="store.$loading.fetchData" message="loading...">
    </div>
</template> 
<script lang="ts" setup>
import { useStore } from '@/store'
const store = useStore()
</script>
```

## License

[MIT](http://opensource.org/licenses/MIT)