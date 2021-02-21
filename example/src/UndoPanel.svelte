<script>
  export let undoManager;

  import { readableUndo } from 'svelt-yjs';

  import ImageButton from './ImageButton.svelte';

  import undoIcon from './images/undo.png';
  import redoIcon from './images/redo.png';

  const undoStore = readableUndo(undoManager);
</script>

<panel>
  <ImageButton
    disabled={$undoStore.undoSize === 0}
    icon={undoIcon}
    on:click={() => undoManager.undo()}
  >
    Undo
    {#if $undoStore.undoSize > 0}({$undoStore.undoSize}){/if}
  </ImageButton>
  <ImageButton
    disabled={$undoStore.redoSize === 0}
    icon={redoIcon}
    on:click={() => undoManager.redo()}
  >
    Redo
    {#if $undoStore.redoSize > 0}({$undoStore.redoSize}){/if}
  </ImageButton>
</panel>

<style>
  panel {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 8px;
    border-top: 2px solid var(--dark);
    border-left: 2px solid var(--dark);
    border-right: 2px solid var(--dark);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: var(--light);
  }
</style>
