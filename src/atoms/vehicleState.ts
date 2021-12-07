import { atom, useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil'

// 차량의 상태
export const vehicleConfig = {
  width: 1.7,
  height: -0.3,
  front: 1.35,
  back: -1.3,
  steer: 0.3,
  force: 1800,
  maxBrake: 65,
  maxSpeed: 88,
}

interface VehicleState {
  width: number
  height: number
  front: number
  back: number
  steer: number
  force: number
  maxBrake: number
  maxSpeed: number
}

export const vehicleState = atom<VehicleState>({
  key: 'vehicleState',
  default: vehicleConfig,
})

// 차량 상태에 대한 상태를 가져오는 함수
export function useVehicleState() {
  return useRecoilState(vehicleState)
}

// 차량 상태 값을 가져온다.
export function useVehicleValue() {
  return useRecoilValue(vehicleState)
}

// 초기화
export function useResetVehicleState() {
  return useResetRecoilState(vehicleState)
}
