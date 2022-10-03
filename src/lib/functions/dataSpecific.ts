import type {
  Distances,
  Deserialized,
  StatusAtDistance
} from '../types'
import { minutesToDs, secondsToDs } from './index'

export const convertToDs = (d: string | undefined) => {
  if (typeof d === 'undefined') return undefined
  const string = d.replace('"', '')
  const minutes = string.split(':')[0]
  let seconds = string.split(':')[1]
  const deciseconds = Number(seconds.split('.')[1])
  seconds = seconds.split('.')[0]
  return minutesToDs(minutes) + secondsToDs(seconds) + deciseconds
}

export const convertKeysToPercent = (d: string): number => {
  const number = Number(d.replace(/\D/g, ''))
  if (number === 10) return number * 10
  return number
}
export const deserializeData = (data: Distances): Deserialized => {
  const deserialized: Deserialized = {}

  // init object
  data['10km'].map(
    (s) =>
      (deserialized[s.person.uuid] = {
        name: s.person.name,
        shirtNumber: s.person.shirtNumber,
        country: s.person.country,
        rank: s.rank,
        wcPts: s.totalWorldCupPoints,
        ncPts: s.totalNationCupPoints,
        times: [] as number[] | undefined
      })
  )

  // add converted durations at measurement points
  for (const statuses of Object.values(data)) {
    for (const status of statuses as StatusAtDistance[]) {
      const time = convertToDs(status.duration)
      const times = deserialized[status.person.uuid].times
      if (typeof time === 'undefined' || !times) {
        deserialized[status.person.uuid].times = undefined
        continue
      }
      times.push(time)
    }
  }

  // add start
  for (const contestant of Object.values(deserialized)) {
    if (typeof contestant.times === 'undefined') continue
    contestant.times.unshift(0)
  }
  return deserialized
}
