<script>
  import { createEventDispatcher } from 'svelte';

  export let icon;
  export let alt;
  export let disabled = false;

  const dispatch = createEventDispatcher();
</script>

<style>
  button {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 8px 16px;
    border: 1px solid var(--medium);
    border-radius: 5px;
    background-color: white;
    min-width: 64px;

    margin: 8px;
  }
  .disabled {
    opacity: 0.5;
  }
  button:active {
    background-color: var(--medium);
    border: 1px solid var(--dark);
  }
  button img {
    display: block;
    width: 24px;
    height: 24px;
    margin: 8px;
  }
</style>

<button class:disabled on:click={() => dispatch('click')}>
  <img src={icon} {alt} />
  <slot />
</button>
