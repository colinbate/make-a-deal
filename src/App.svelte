<script lang="ts">
	import ModeSwitcher from './ModeSwitcher.svelte';
	import Tailwindcss from './Tailwindcss.svelte';
	import Cases from './Cases.svelte';
	import Money from './Money.svelte';
	import Offer from './Offer.svelte';
	import Round from './Round.svelte';
	import FinalSwap from './FinalSwap.svelte';
	import Banner from './Banner.svelte';
	import { state, send } from './logic';
	import { asMoney } from './logic/random';

function pickCase(ev) {
	send({
		type: 'SELECT_CASE',
		id: ev.detail.id,
	});
}

function deal() {
	send({type: 'DEAL'});
}

function noDeal() {
	send({type: 'NO_DEAL'});
}

function swap() {
	send({type: 'SWAP_CASE'});
}

function check() {
	send({type: 'NO_SWAP'});
}
</script>
<Tailwindcss />
<ModeSwitcher />
<main class="p-4 mx-auto text-center max-w-xl">
	{#if $state.matches('welcome')}
	<h1 class="uppercase text-4xl leading-normal font-thin text-svelte">Make A Deal</h1>
	<p class="py-3">Welcome to Make A Deal. You choose a case that could contain a million dollars.
		By removing other cases you determine what yours is.
		Along the way the game will make offers to 'buy you out'.
		See how much you can win!
	</p>
	{/if}
	{#if $state.matches('playing')}
		<Money board={$state.context.board}/>
		{#if $state.matches('playing.chooseCase')}
		<p>Please choose your case:</p>
		{/if}
		{#if $state.context.round}
		<Round round={$state.context.round} />
		{/if}
		<Cases cases={$state.context.cases} on:select={pickCase}/>
		{#if $state.matches('playing.showCase')}
		<Banner>{asMoney($state.context.removed.contents)}</Banner>
		{/if}
		{#if $state.matches('playing.reviewOffer')}
		<Offer offer={$state.context.offer} on:deal={deal} on:nodeal={noDeal}/>
		{/if}
		{#if $state.matches('playing.finalSwap')}
		<FinalSwap cases={$state.context.cases} on:swap={swap} on:noswap={check} />
		{/if}
		{#if $state.matches('playing.showWinnings')}
		<Banner>
			<div>You win {asMoney($state.context.winnings)}</div>
			{#if $state.context.reveal}<div>Your case ({$state.context.selectedCase.id}) had {asMoney($state.context.selectedCase.contents)}</div>{/if}
			<div>Grand total {asMoney($state.context.grandTotal)}</div>
			<button type="button" on:click={() => send({type: 'NEW_GAME'})} class="text-xl rounded px-3 py-2 bg-blue-400">Replay</button>
		</Banner>
		{/if}
	{:else}
		<button type="button" on:click={() => send({type: 'NEW_GAME'})} class="rounded px-3 py-2 bg-blue-400">Start</button>
	{/if}
</main>