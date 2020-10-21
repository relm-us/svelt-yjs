<script>
  export let map;

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

<ShowPanel title="Animal Count" subtitle="(Y.Map)">
  <buttons>
    <spacer />
    <ImageButton
      icon={animalIcon}
      alt="paw print"
      on:click={() => map.y.set(animal(), 0)}>
      Add an Animal
    </ImageButton>

    <ImageButton
      icon={resetIcon}
      alt="paw print"
      on:click={() => map.y.forEach((value, key) => map.y.delete(key))}>
      Reset
    </ImageButton>
  </buttons>
  {#each [...$map] as [key, value]}
    <Row>
      <Button on:click={() => map.y.delete(key)}>remove</Button>
      <Item {key} {value} />
      <div style="float:right">
        <Button on:click={() => map.y.set(key, map.y.get(key) + 1)}>+</Button>
        <Button
          on:click={() => {
            const value = map.y.get(key);
            if (value > 0) {
              map.y.set(key, value - 1);
            }
          }}>
          -
        </Button>
      </div>
    </Row>
  {/each}
</ShowPanel>
