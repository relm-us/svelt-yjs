<script>
  import { createEventDispatcher } from 'svelte';

  export let icon;
  export let alt;

  const dispatch = createEventDispatcher();
</script>

<style>
  button {
    font-size: 70%;

    padding: 8px 16px;
    border: 1px solid var(--medium);
    border-radius: 5px;
    background-color: white;

    margin: 8px 4px;
  }
  button:active {
    background-color: var(--medium);
    border: 1px solid var(--dark);
  }
</style>

<button on:click={() => dispatch('click')}>
  <slot />
</button>
