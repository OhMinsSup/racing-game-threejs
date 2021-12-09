import { selector, useRecoilValue } from 'recoil'
import { vehicleState } from './vehicleState'
import { helpersState, controlsState } from './configState'

export const settingWithFamily = selector({
  key: 'settingWithFamily',
  get: ({ get }) => {
    const controls = get(controlsState)
    const helpers = get(helpersState)
    const vehicle = get(vehicleState)
    return {
      ...controls,
      ...helpers,
      ...vehicle,
    }
  },
})

export function useSettingValue() {
  return useRecoilValue(settingWithFamily)
}
