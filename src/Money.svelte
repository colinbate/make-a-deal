<script lang="ts">
import { asMoney } from "./logic/random";

import type { Value } from "./logic/types";

export let board: Value[];

</script>
<style>
  .grid-rows-13 {
    grid-template-rows: repeat(13, minmax(0, 1fr));
  }
</style>
<div class="grid grid-flow-col grid-rows-13 grid-cols-2">
  {#each board as val}
  <div class="py-0 px-4 text-black rounded m-1" class:bg-yellow-300={!val.seen} class:bg-gray-400={val.seen}>{asMoney(val.amount)}</div>
  {/each}
</div>