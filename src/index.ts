import type { PiniaPluginContext } from "pinia";
import { reactive } from "vue";

export function PiniaLoading({ options, store }: PiniaPluginContext) {
  if (options.actions) {
    const $loading = reactive<Record<string, boolean>>({});
    Object.keys(options.actions).forEach((actionKey) => {
      const originAction = options.actions[actionKey]
      const action = function(this: unknown, ...args : unknown[]) {
        const rtn = originAction.apply(this, args)
        if (rtn instanceof Promise) {
          $loading[actionKey] = false;
          return new Promise((resolve, reject) => {
            $loading[actionKey] = true;
            rtn
              .then(resolve)
              .catch(reject)
              .finally(() => {
                $loading[actionKey] = false;
              });
          });
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
      [K in keyof A as A[K] extends (...args: any[]) => Promise<any>
        ? K
        : never]: boolean;
    };
  }
}
