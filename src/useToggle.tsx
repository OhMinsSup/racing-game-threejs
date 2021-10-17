import { useStore } from './store'

import type { ComponentType, PropsWithChildren } from 'react'
import type { IState } from './store'

type IStateKey = keyof IState

/**
 * UseToggle hook - toggle로 받은 값은 array or string 일 수 있다.
 * 하지만 이건 의도된 값이다. string인 경우 array로 변환하고 array의 경우 그래로 진행을 한다.
 * 그리고 해당 toggle값을 저장하고 있는 state값의 key와 일치해야하고 해당 key의 값을 리턴한다.
 * 해당 값이 true인 경우 화면을 렌더링한다.
 */
export const useToggle =
  <P extends {}>(ToggledComponent: ComponentType<P>, toggle: IStateKey | IStateKey[]) =>
  (props: PropsWithChildren<P>) => {
    const keys = Array.isArray(toggle) ? toggle : [toggle]
    const values = useStore((state) => keys.map((key) => state[key]))
    return values.every((v) => !!v) ? <ToggledComponent {...props} /> : props.children ? <>{props.children}</> : null
  }
