/* eslint-disable @typescript-eslint/no-explicit-any */
import { unstable_batchedUpdates } from '@/libs/react-utils/reactBatchedUpdates'

export default function addEventListenerWrap(
  target: Window | Document,
  eventType: string,
  cb: (...args: any[]) => void,
  option?: boolean | AddEventListenerOptions,
) {
  const callback = unstable_batchedUpdates
    ? function run(e: any) {
        unstable_batchedUpdates(cb, e)
      }
    : cb

  if (target.addEventListener) {
    target.addEventListener(eventType, callback, option)
  }
  return {
    remove: () => {
      if (target.removeEventListener) {
        target.removeEventListener(eventType, callback, option)
      }
    },
  }
}
