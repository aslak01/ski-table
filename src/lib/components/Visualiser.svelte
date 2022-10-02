<script lang="ts">
  import { onMount } from 'svelte'
  import type { Distances } from '../types'
  import Piste from './Piste.svelte'
  export let data: Distances

  import {
    convertToDs,
    deserializeData,
    convertKeysToPercent
  } from '../functions'

  const pctAtIndex = Object.keys(data).map((k) =>
    convertKeysToPercent(k)
  )
  pctAtIndex.unshift(0)
  console.log(pctAtIndex)
  const timesInDsAtFinish = data['10km']
    .map((time) => convertToDs(time.duration))
    .filter((n) => typeof n !== 'undefined')
  const slowestTime = Math.max(...(timesInDsAtFinish as number[]))
  const fastestTime = Math.min(...(timesInDsAtFinish as number[]))

  const contestants = deserializeData(data)

  console.log(contestants)

  let progress = 0
  let playing = false
  let max = 100

  const start = new Date().getTime()

  function getElapsed() {
    return new Date().getTime() - start
  }

  let elapsed = getElapsed()

  onMount(() => {
    let rid = requestAnimationFrame(function update() {
      elapsed = getElapsed()
      rid = requestAnimationFrame(update)
    })
    return () => cancelAnimationFrame(rid)
  })
</script>

<Piste
  {contestants}
  {pctAtIndex}
  slowestTime={fastestTime}
  {playing}
  {elapsed}
  {progress}
  {max}
/>
