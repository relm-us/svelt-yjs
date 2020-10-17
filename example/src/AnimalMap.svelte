<script>
  export let map;

  import animal from './animals';

  import Row from './Row.svelte';
  import Item from './Item.svelte';
  import ImageButton from './ImageButton.svelte';
  import ShowPanel from './ShowPanel.svelte';

  import animalIcon from './images/animal.png';
</script>

<ShowPanel title="Animal Count" subtitle="(Y.Array)">
  <ImageButton
    icon={animalIcon}
    alt="paw print"
    on:click={() => map.y.set(animal(), 0)}>
    Add an Animal to the List
  </ImageButton>
  {#each [...$map] as [key, value]}
    <Row>
      <button on:click={() => map.y.delete(key)}>remove</button>
      <Item {key} {value} />
      <div style="float:right">
        <button on:click={() => map.y.set(key, map.y.get(key) + 1)}>+</button>
        <button
          on:click={() => {
            const value = map.y.get(key);
            if (value > 0) {
              map.y.set(key, value - 1);
            }
          }}>-</button>
      </div>
    </Row>
  {/each}
</ShowPanel>
