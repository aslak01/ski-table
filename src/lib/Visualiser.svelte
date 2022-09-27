<script lang="ts">
  import { onMount } from 'svelte'
  import type { WorldCupData } from './types/definitions'
  export let data: WorldCupData

  onMount(() => {
    console.log(data)
  })
</script>
