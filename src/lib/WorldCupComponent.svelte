<script lang="ts">
  import Heading from './components/Heading.svelte'
  import Visualiser from './components/Visualiser.svelte'
  import type { WorldCupData } from './types'
  export let data: WorldCupData
  // const countries = data['1.1km'].map((time) => time.person.country)
  // const uniqueCountries = [...new Set(countries)]

  // const uniqueContestants1 = data['1.1km'].map(
  //   (time) => time.person.uuid
  // )
  // const uniqueContestants2 = data['10km'].map(
  //   (time) => time.person.uuid
  // )
  // const stringArrSharesAllVals = (
  //   array1: string[],
  //   array2: string[]
  // ) =>
  //   array1.length === array2.length &&
  //   array1.every((value) => array2.includes(value))
  //
  // console.log(
  //   'contestant list is equal at 1,1km & 10km',
  //   stringArrSharesAllVals(uniqueContestants1, uniqueContestants2)
  // )
  // const potentialCountries = { Norway, Sweden }
</script>

<Heading data={data.racedata} />
<Visualiser data={data.locations} />
