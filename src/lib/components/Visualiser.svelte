<script lang="ts">
  import { onMount } from 'svelte'
  import type { Distances } from '../types/definitions'
  export let data: Distances

  const countries = data['1.1km'].map(time => time.person.country)
  const uniqueCountries = [...new Set(countries)]

  const potentialCountries = { Norway, Sweden }

  import Norway from '~icons/emojione-v1/flag-for-norway'
  import Sweden from '~icons/emojione-v1/flag-for-sweden'

  onMount(() => {
    console.log(data)
    console.log(uniqueCountries)
  })
</script>

<Norway />
{#each Object.entries(data) as [key, lines]}
  {key}
  <div class="lines">
    {#each lines as line}
      {@const country = line.person.country}
      <div class="line">
        {line.duration}
        {line.person.name}
        {#if country === 'Norway' || country == 'Sweden'}
          <svelte:component this={potentialCountries[country]} />
        {/if}
        {line.person.country}
      </div>
    {/each}
  </div>
{/each}

<style>
  .lines {
    display: block;
    max-width: 100;
    overflow-wrap: break-word;
    color: var(--yellow-2);
  }
  .line {
    border: 1px white solid;
    margin-bottom: 5px;
  }
</style>
