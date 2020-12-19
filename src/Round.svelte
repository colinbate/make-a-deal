<script lang="ts">
import type { Round } from "./logic/types";

export let round: Round;
</script>
<div>
<div>Round {round.id}</div>
<div>Choose {round.remaining} case{round.remaining === 1 ? '' : 's'}</div>
</div>