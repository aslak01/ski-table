<script lang="ts">
  import type { MetaData } from '../types/definitions'
  export let data: MetaData
</script>

<div class="header">
  {data.name}
  {data.date}
  {data.competitionName}
  {data.season}
</div>

<style>
  .header {
    font-size: var(--font-size-fluid-5);
  }
</style>
