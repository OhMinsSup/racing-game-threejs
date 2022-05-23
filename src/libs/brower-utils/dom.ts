import { isElement } from '../../utils/assertion'

import type { MutableRefObject } from 'react'

export function getOwnerWindow(node?: Element | null): typeof globalThis {
  return isElement(node) ? getOwnerDocument(node)?.defaultView ?? window : window
}

export function getOwnerDocument(node?: Element | null): Document {
  return isElement(node) ? node?.ownerDocument ?? document : document
}

export type BasicTarget<T = HTMLElement> = (() => T | null) | T | null | MutableRefObject<T | null | undefined>

type TargetElement = HTMLElement | Element | Document | Window

export function getTargetElement(target?: BasicTarget<TargetElement>, defaultElement?: TargetElement): TargetElement | undefined | null {
  if (!target) {
    return defaultElement
  }

  let targetElement: TargetElement | undefined | null

  if (typeof target === 'function') {
    targetElement = target()
  } else if ('current' in target) {
    targetElement = target.current
  } else {
    targetElement = target
  }

  return targetElement
}
