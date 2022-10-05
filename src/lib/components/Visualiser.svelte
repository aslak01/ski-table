<script lang="ts">
  import { onMount } from 'svelte'
  import type { WorldCupData } from '../types'
  import { deserializeData, clamp, convertToDs } from '../functions'
  import Contestant from './Contestant.svelte'
  import Heading from './Heading.svelte'
  export let data: WorldCupData

  let debug = true
  let startTime: null | number = null
  let timeElapsed = 0
  let pauseTime = 0
  let pause = false
  let running = false
  let progress = 0
  let framesTo100 = 10000

  const startOrPause = () => {
    running = !running
    pause = !pause
  }

  const startRace = () => {
    running = true
    requestAnimationFrame(loop)
  }

  const restart = () => {
    timeElapsed = 0
    startTime = null
    pauseTime = 0
    running = true
    pause = false
    requestAnimationFrame(loop)
  }

  $: progress = Math.floor(clamp(timeElapsed, 0, framesTo100))

  function loop(timeStamp: number) {
    if (startTime === null) {
      startTime = timeStamp
    }
    if (running && pause === false) {
      timeElapsed = timeStamp - startTime - pauseTime
      requestAnimationFrame(loop)
    } else if (running && pause) {
      pauseTime = timeStamp - startTime - timeElapsed
      timeElapsed = timeStamp - startTime - pauseTime
      pause = false
      requestAnimationFrame(loop)
    }
  }

  const deserializedData = deserializeData(data.locations)
  const slowestTime = deserializedData.slowestTime

  const countryList = deserializedData.countries
  let selectedCountries: string[] = []
  let contestants: Contestant[] = []
  let unselectedCountries: string[] = []
  $: if (mounted) {
    selectedCountries = deserializedData.countries
    contestants = contestants.filter(
      (c) => selectedCountries.includes(c.country) === true
    )

    unselectedCountries = countryList.filter(
      (c) => selectedCountries.includes(c) === false
    )
    console.log(selectedCountries)
  }
  const addCountry = (country: string) => {
    let copy = selectedCountries
    copy.push(country)
    copy = [...new Set(copy)]
    selectedCountries = copy
  }
  const removeCountry = (country: string) => {
    const index = selectedCountries.indexOf(country)
    if (index > 0) {
      selectedCountries.splice(index, 1)
      // unselectedCountries.push(country)
    }

    console.log('removing', country, index)
  }
  let mounted = false
  onMount(() => (mounted = true))
</script>

{#if mounted}
  {#each selectedCountries as country}
    <button on:click={() => removeCountry(country)}>{country}</button>
  {/each}
  {#each unselectedCountries as country}
    <button on:click={() => addCountry(country)}>{country}</button>
  {/each}
  <Heading
    data={data.racedata}
    {running}
    {timeElapsed}
    {framesTo100}
    {pause}
    on:toggle={startOrPause}
    on:start={startRace}
    on:replay={restart}
  />
  <div class="wrapper" style="--heightFactor: {contestants.length}">
    {#if debug}
      <div class="info">
        {progress}
      </div>
    {/if}
    <div class="indicator-labels">
      <div class="check">START</div>
      <div class="check">1,1 km</div>
      <div class="check">3,1 km</div>
      <div class="check">5,0 km</div>
      <div class="check">6,1 km</div>
      <div class="check">
        <span>8,1 km</span>
        <span>FINISH</span>
      </div>
    </div>
    <div class="indicators">
      <div class="check" />
      <div class="check" />
      <div class="check" />
      <div class="check" />
      <div class="check" />
      <div class="check" />
    </div>
    <div class="piste">
      {#each contestants as contestant}
        <Contestant
          {contestant}
          {framesTo100}
          {progress}
          {slowestTime}
        />
      {/each}
    </div>
  </div>
{/if}

<style>
  .wrapper {
    display: grid;
    grid-template-columns: 10% 80% 10%;
    grid-template-rows: 15px 15px 100%;
    height: calc(calc(var(--heightFactor) * 15.5px) + 35px);
    width: 100%;
    overflow: hidden;
    background: black;
  }
  .info {
    position: absolute;
    color: white;
    top: 5px;
    right: 10px;
  }
  .piste {
    grid-area: 3 / 2 / 3 / 2;
    z-index: 2;
  }
  .indicator-labels {
    grid-area: 1 / 2 / 2 / 2;
    height: 100%;
    display: grid;
    grid-template-columns: 11% 20% 19% 11% 20% 19%;
    z-index: 1;
  }
  .indicators {
    grid-area: 2 / 2 / 4 / 2;
    height: 100%;
    display: grid;
    grid-template-columns: 11% 20% 19% 11% 20% 19%;
    z-index: 1;
  }
  .check {
    border-right: 1px dotted white;
    height: 100%;
    opacity: 0.5;
    color: white;
    font-size: 8pt;
    text-align: left;
  }
  .check:first-of-type {
    border-left: 1px dashed white;
  }
  .check:last-of-type {
    border-right: 1px dashed white;
  }
</style>
