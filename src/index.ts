import type { PiniaPluginContext } from 'pinia'
import { ref, Ref } from 'vue-demi'

export function PiniaLoading({ options, store }: PiniaPluginContext) {
  if (options.actions) {
    const $loading: Record<string, Ref<boolean>> = {}
    Object.keys(options.actions).forEach((actionKey) => {
      const originAction = options.actions[actionKey]
      const action = function(this: unknown, ...args : unknown[]) {
        const rtn = originAction.apply(this, args)
        if (rtn instanceof Promise) {
          $loading[actionKey] = ref(false)
          return new Promise((resolve, reject) => {
            $loading[actionKey].value = true
            rtn
              .then(resolve)
              .catch(reject)
              .finally(() => {
                $loading[actionKey].value = false
              })
          })
        } else {
          return rtn
        }
      }
      store[actionKey] = action
    })

    store.$loading = $loading
  }
}

declare module 'pinia' {
  // eslint-disable-next-line
  export interface PiniaCustomProperties<Id, S, G, A> {
    $loading: {
      [K in keyof A as A[K] extends (...args: any[]) => Promise<any> ? K : never]: Ref<boolean>;
    }
  }
}
