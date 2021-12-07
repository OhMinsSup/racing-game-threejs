export const readableTime = (time: number): string => (time / 1000).toFixed(2)

export const getTime = (finished: number, start: number) => {
  const time = start && !finished ? Date.now() - start : 0
  return `${readableTime(time)}`
}
