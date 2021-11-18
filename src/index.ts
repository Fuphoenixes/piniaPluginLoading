import type { PiniaPluginContext } from 'pinia'
import { ref, Ref } from 'vue-demi'

export function PiniaLoading({ options, store }: PiniaPluginContext) {
  if (options.actions) {
    const $loading: Record<string, Ref<Boolean>> = {}
    Object.keys(options.actions).forEach((actionKey) => {
      const originAction = options.actions[actionKey]
      const loading = ref(false)
      const action = function(this: unknown, ...args : unknown[]) {
        const rtn = originAction.apply(this, args)
        if (rtn instanceof Promise) {
          return new Promise((resolve, reject) => {
            loading.value = true
            rtn
              .then(resolve)
              .catch(reject)
              .finally(() => {
                loading.value = false
              })
          })
        } else {
          return rtn
        }
      }
      store[actionKey] = action
      $loading[actionKey] = loading
    })

    store.$loading = $loading
  }
}

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    $loading: {
      [K in keyof A as A[K] extends () => Promise<any> ? K : never ]: Ref<Boolean>;
    }
  }
}
