import type {
  Distances,
  Deserialized,
  StatusAtDistance,
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
  const deserialized: Deserialized = {
    contestants: [],
    countries: [],
    slowestTime: 0,
  }
  const countries: string[] = []
  const times: number[] = []
  // init object
  data['10km'].map((s) => {
    const country =
      // @ts-expect-error (due to import of flags)
      s.person.country === 'Czech Republic'
        ? 'Czechia'
        : s.person.country
    deserialized.contestants.push({
      name: s.person.name,
      lastName: s.person.lastName,
      uuid: s.person.uuid,
      shirtNumber: s.person.shirtNumber,
      country,
      rank: s.rank,
      wcPts: s.totalWorldCupPoints,
      ncPts: s.totalNationCupPoints,
      times: [] as number[] | undefined,
    })
    countries.push(
      // @ts-expect-error (due to import of flags)
      s.person.country === 'Czech Republic'
        ? 'Czechia'
        : s.person.country,
    )
    const time = convertToDs(s.duration)
    if (typeof time !== 'undefined') {
      times.push(time)
    }
  })

  deserialized.slowestTime = Math.max(
    ...times.filter((n) => typeof n !== 'undefined'),
  )

  const uniqueCountries = [...new Set(countries)]
  deserialized.countries = uniqueCountries

  // add converted durations at measurement points
  for (const statuses of Object.values(data)) {
    for (const status of statuses as StatusAtDistance[]) {
      const time = convertToDs(status.duration)
      const uuid = status.person.uuid
      const contestant = deserialized.contestants.find(
        (c) => c.uuid === uuid,
      )
      if (typeof contestant === 'undefined') continue
      const times = contestant.times
      if (typeof time === 'undefined' || !times) {
        contestant.times = undefined
        continue
      }
      times.push(time)
    }
  }

  // add start
  for (const contestant of deserialized.contestants) {
    if (typeof contestant.times === 'undefined') continue
    contestant.times.unshift(0)
  }
  return deserialized
}
