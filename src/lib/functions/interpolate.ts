export const linearInterpolate = (
  min: number,
  max: number,
  amt: number
): number => min * (1 - amt) + max * amt

export const lerpArrSegment = (
  min: number,
  max: number,
  minIndex: number,
  maxIndex: number
): number[] => {
  const arrSegment = []
  const segmentLength = maxIndex - minIndex
  for (let i = 0; i < segmentLength; i++) {
    arrSegment.push(linearInterpolate(min, max, i / segmentLength))
  }
  return arrSegment
}
