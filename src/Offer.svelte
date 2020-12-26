<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { asMoney } from './logic/random';
import Banner from './Banner.svelte';

const dispatch = createEventDispatcher();
export let offer: number;

</script>
<Banner>
  <div>Offer: {asMoney(offer)}</div>
  <div>
    <button type="button" class="rounded px-3 py-2 bg-blue-400" on:click={() => dispatch('deal')}>Deal</button>
    <button type="button" class="rounded px-3 py-2 bg-blue-400" on:click={() => dispatch('nodeal')}>No Deal</button>
  </div>
</Banner>