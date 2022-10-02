<script lang="ts">
  import type { Deserialized } from '../types'
  import { clamp } from '../functions'
  import ContestantRep from './Contestant.svelte'
  export let contestants: Deserialized
  export let pctAtIndex: number[]
  export let playing: boolean
  export let progress: number
  export let elapsed: number
  export let max: number
  export let slowestTime: number
  $: updatedProgress = Math.floor(clamp(elapsed / 100, 0, 100))
  // $: console.log(updatedProgress)
</script>

<div class="piste">
  {#each Object.entries(contestants) as [uuid, contestant]}
    <ContestantRep
      {contestant}
      {uuid}
      {pctAtIndex}
      {slowestTime}
      progress={updatedProgress}
      {playing}
    />
  {/each}
</div>

<style>
  .piste {
    position: relative;
    height: 300px;
    overflow: hidden;
    width: 100%;
    background: black;
  }
</style>
