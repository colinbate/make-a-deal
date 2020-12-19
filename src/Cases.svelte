<script lang="ts">
import type { Case } from "./logic/types";
import { createEventDispatcher } from 'svelte';

export let cases: Case[];
$: visible = cases.filter(c => c.show);
const dispatch = createEventDispatcher();

function selectCase(id: number) {
  dispatch('select', { id })
}
</script>
<div>
  {#each visible as bc}
  <button class="px-3 py-2 rounded text-black m-1 w-1/6" class:bg-blue-400={!bc.open} class:bg-gray-400={bc.open} type="button" on:click={() => selectCase(bc.id)}>{bc.id}</button>
  {/each}
</div>