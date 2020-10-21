<script>
  export let array;

  import animal from './animals';

  import Row from './Row.svelte';
  import Item from './Item.svelte';
  import Button from './Button.svelte';
  import ImageButton from './ImageButton.svelte';
  import ShowPanel from './ShowPanel.svelte';

  import animalIcon from './images/animal.png';
  import resetIcon from './images/reset.png';
</script>

<style>
  spacer {
    width: 80px;
  }
  buttons {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
</style>

<ShowPanel title="Animal List" subtitle="(Y.Array)">
  <buttons>
    <spacer />
    <ImageButton
      icon={animalIcon}
      alt="paw print"
      on:click={() => array.y.push([animal()])}>
      Add an Animal
    </ImageButton>

    <ImageButton
      icon={resetIcon}
      alt="paw print"
      on:click={() => array.y.delete(0, array.y.length)}>
      Reset
    </ImageButton>
  </buttons>
  {#each $array as item, i}
    <Row>
      <Button on:click={() => array.y.delete(i)}>remove</Button>
      <Item value={item} />
    </Row>
  {/each}
</ShowPanel>
