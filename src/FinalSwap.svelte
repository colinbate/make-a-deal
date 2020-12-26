<script lang="ts">
import { createEventDispatcher } from 'svelte';
import type { Case } from './logic/types';
import Banner from './Banner.svelte';
  
const dispatch = createEventDispatcher();
export let cases: Case[];
  $: lastCase = cases.find(c => !c.open);
</script>
<Banner>
<div>Would you like to swap your case for case {lastCase.id}?</div>
<button type="button" on:click={() => dispatch('noswap')} class="text-xl rounded px-3 py-2 bg-blue-400">Keep My Case</button>
<button type="button" on:click={() => dispatch('swap')} class="text-xl rounded px-3 py-2 bg-blue-400">Swap Cases</button>
</Banner>