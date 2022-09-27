<script lang="ts">
  import Heading from './components/Heading.svelte'
  import Visualiser from './components/Visualiser.svelte'
  import type { WorldCupData } from './types/definitions'
  export let data: WorldCupData
</script>

<Heading data={data.racedata} />
<Visualiser data={data.locations} />
