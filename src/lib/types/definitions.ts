export interface Person {
  country: string
  firstName: string
  lastName: string
  shirtNumber: number
  uuid: string
}

export interface LocationSnapshot {
  duration: string
  person: Person
  rank: number
  uuid: string
}

export interface Locations {
  '1.1km': LocationSnapshot[]
  '3.1km': LocationSnapshot[]
  '5.0km': LocationSnapshot[]
  '6.1km': LocationSnapshot[]
  '8.1km': LocationSnapshot[]
  '10km': LocationSnapshot[]
}

export interface Racedata {
  competitionName: string
  date: string
  name: string
  season: string
}

export interface WorldCupData {
  racedata: Racedata
  locations: Locations
}
