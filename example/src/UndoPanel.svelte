<script>
  export let undoManager;

  import ImageButton from './ImageButton.svelte';

  import undoIcon from './images/undo.png';
  import redoIcon from './images/redo.png';
</script>

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

<panel>
  <ImageButton icon={undoIcon} on:click={() => undoManager.undo()}>
    Undo
  </ImageButton>
  <ImageButton icon={redoIcon} on:click={() => undoManager.redo()}>
    Redo
  </ImageButton>
</panel>
