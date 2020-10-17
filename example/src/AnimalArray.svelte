<script>
  export let array;

  import animal from './animals';

  import Row from './Row.svelte';
  import Item from './Item.svelte';
  import ImageButton from './ImageButton.svelte';
  import ShowPanel from './ShowPanel.svelte';

  import animalIcon from './images/animal.png';
</script>

<ShowPanel title="Animal List" subtitle="(Y.Array)">
  <ImageButton
    icon={animalIcon}
    alt="paw print"
    on:click={() => array.y.push([animal()])}>
    Add an Animal to the List
  </ImageButton>
  {#each $array as item, i}
    <Row>
      <button on:click={() => array.y.delete(i)}>remove</button>
      <Item value={item} />
    </Row>
  {/each}
</ShowPanel>
