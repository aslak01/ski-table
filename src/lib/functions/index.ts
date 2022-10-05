export * from './interpolate'
export * from './dataSpecific'
export * from './events'

export const clamp = (n: number, min: number, max: number) => {
  if (n < min) return min
  if (n > max) return max
  return n
}

export const minutesToDs = (m: string | number): number =>
  Number(m) * 60 * 10
export const secondsToDs = (s: string | number): number =>
  Number(s) * 10

export const dsToHumandate = (ds: number): string => {
  const milliseconds = ds * 100
  const mydate = new Date(milliseconds)
  const minutes = mydate.getUTCMinutes()
  const seconds = mydate.getUTCSeconds()
  const deciseconds = Math.floor(mydate.getUTCMilliseconds() / 100)
  const humandate = `${minutes}:${seconds},${deciseconds}s`
  return humandate
}
