<script lang="ts">
  import type { Racedata } from '../types/definitions'
  export let data: Racedata
</script>

<div>
  {data.name}
  {data.date}
  {data.competitionName}
  {data.season}
</div>
