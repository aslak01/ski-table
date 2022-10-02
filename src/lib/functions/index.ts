export * from './interpolate'
export * from './dataSpecific'

export const clamp = (n: number, min: number, max: number) => {
  if (n < min) return min
  if (n > max) return max
  return n
}

export const minutesToDs = (m: string | number): number =>
  Number(m) * 60 * 10
export const secondsToDs = (s: string | number): number =>
  Number(s) * 10
