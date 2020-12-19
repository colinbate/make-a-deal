<script lang="ts">
import { createEventDispatcher } from 'svelte';
import type { Case } from './logic/types';
  
const dispatch = createEventDispatcher();
export let cases: Case[];
  $: lastCase = cases.find(c => !c.open);
</script>
<div class="text-3xl fixed top-1/2 left-0 transform -translate-y-1/2 bg-blue-200 text-black w-full p-4">
<div>Would you like to swap your case for case {lastCase.id}?</div>
<button type="button" on:click={() => dispatch('noswap')} class="text-xl rounded px-3 py-2 bg-blue-400">Keep My Case</button>
<button type="button" on:click={() => dispatch('swap')} class="text-xl rounded px-3 py-2 bg-blue-400">Swap Cases</button>
</div>