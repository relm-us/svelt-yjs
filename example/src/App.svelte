<script>
  import * as Y from 'yjs';
  import { WebsocketProvider } from 'y-websocket';
  import { array, map } from 'sveltyjs';

  import Header from './Header.svelte';
  import Explanation from './Explanation.svelte';

  import animal from './animals';

  import undoIcon from './undo.png';
  import redoIcon from './redo.png';

  // All Yjs types must be embedded in a Y.Doc
  const ydoc = new Y.Doc();

  const wsUrl =
    window.location.hostname === 'localhost'
      ? 'ws://localhost:5001'
      : 'wss://y.sveltyjs.dev';
  // Connect our Y.Doc to the sync server. Note that you could also use p2p
  // via webrtc (due to Yjs' CRDT convergence algorithm, no server necessary).
  new WebsocketProvider(wsUrl, 'example', ydoc);

  // Create a Y.Array<string> in the Y.Doc
  const yarray = ydoc.getArray('list');

  // Create a Y.Map<number> in the Y.Doc
  const ymap = ydoc.getMap('dict');

  // Generate two Svelte readable stores from the Y types we just added to the Y.Doc
  const list = array.readable(yarray);
  const dict = map.readable(ymap);

  // Add undo/redo manager
  const undoManager = new Y.UndoManager([list.y, dict.y], {
    captureTimeout: 0,
  });
</script>

<style>
  page {
    display: block;
    background-color: var(--light);
    width: 600px;
    margin: 0 auto;
    padding: 64px 0 64px 0;
  }
  h2 {
    text-align: center;
    color: var(--punch);
    margin: 16px auto 0 auto;
  }
  subtitle {
    display: block;
    text-align: center;
    font-size: 16px;
    color: var(--dark);
    margin-bottom: 16px;
  }
  button.icon {
    padding: 0;
    padding-bottom: 8px;
    border: 0;
    border-radius: 5px;
    background-color: white;
    min-width: 64px;
  }
  button.icon:active {
    background-color: var(--dark);
    color: white;
  }
  button.icon img {
    display: block;
    width: 24px;
    height: 24px;
    margin: 16px 16px 8px 16px;
  }
  undo-panel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-top: 24px;
    border-top: 1px solid var(--medium);
    padding-top: 16px;
  }
  undo-panel button {
    margin: 8px;
  }

  show-panel {
    border-top: 1px solid var(--medium);
    margin: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  row {
    display: block;
    margin: 8px;
    min-width: 400px;
    border-bottom: 2px solid white;
  }

  item {
    font-size: 14px;
  }
  item em {
    font-size: 16px;
    font-weight: bold;
  }
</style>

<page>
  <Header />
  <content>
    <Explanation />
    <h2>Open this in another tab, too!</h2>
    <undo-panel>
      <button class="icon" on:click={() => undoManager.undo()}><img
          src={undoIcon}
          alt="undo" />Undo</button>
      <button class="icon" on:click={() => undoManager.redo()}><img
          src={redoIcon}
          alt="redo" />Redo</button>
    </undo-panel>

    <show-panel>
      <h2>Make an Animal</h2>
      <subtitle>(Y.Array)</subtitle>
      <button on:click={() => list.y.push([animal()])}> Random Animal </button>
      <list>
        {#each $list as item, i}
          <row>
            <button on:click={() => list.y.delete(i)}>remove</button>
            <item>{item}</item>
          </row>
        {/each}
      </list>
    </show-panel>

    <show-panel>
      <h2>Animal Count</h2>
      <subtitle>(Y.Map)</subtitle>
      <button on:click={() => dict.y.set(animal(), 0)}> Random Animal </button>
      <list>
        {#each [...$dict] as [key, value]}
          <row>
            <button on:click={() => dict.y.delete(key)}>remove</button>
            <item>{key}: <em>{value}</em></item>
            <div style="float:right">
              <button
                on:click={() => dict.y.set(key, dict.y.get(key) + 1)}>+</button>
              <button
                on:click={() => {
                  const value = dict.y.get(key);
                  if (value > 0) {
                    dict.y.set(key, value - 1);
                  }
                }}>-</button>
            </div>
          </row>
        {/each}
      </list>
    </show-panel>
  </content>
</page>
