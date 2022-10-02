export interface Person {
  country: string
  firstName: string
  lastName: string
  name: string
  shirtNumber: number
  uuid: string
}

export interface StatusAtDistance {
  duration?: string
  person: Person
  rank?: number
  timeDifference?: string
  totalNationCupPoints?: number
  totalWorldCupPoints?: number
  uuid: string
}

export interface Distances {
  '1.1km': StatusAtDistance[]
  '3.1km': StatusAtDistance[]
  '5.0km': StatusAtDistance[]
  '6.1km': StatusAtDistance[]
  '8.1km': StatusAtDistance[]
  '10km': StatusAtDistance[]
}

export interface MetaData {
  competitionName: string
  date: string
  name: string
  season: string
}

export interface WorldCupData {
  racedata: MetaData
  locations: Distances
}

export interface PersonWithTimes extends Person {
  times: number[] | undefined
}

export type Contestant = Omit<
  PersonWithTimes,
  'uuid' | 'firstName' | 'lastName'
>

export interface Deserialized {
  [key: string]: Contestant
}
