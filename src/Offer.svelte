<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { asMoney } from './logic/random';

const dispatch = createEventDispatcher();
export let offer: number;

</script>
<div class="text-3xl fixed top-1/2 left-0 transform -translate-y-1/2 bg-blue-200 text-black w-full p-4">
  <div>Offer: {asMoney(offer)}</div>
  <div>
    <button type="button" class="rounded px-3 py-2 bg-blue-400" on:click={() => dispatch('deal')}>Deal</button>
    <button type="button" class="rounded px-3 py-2 bg-blue-400" on:click={() => dispatch('nodeal')}>No Deal</button>
  </div>
</div>