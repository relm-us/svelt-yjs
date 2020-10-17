<script>
  import * as Y from 'yjs';
  import { WebsocketProvider } from 'y-websocket';
  import { array, map } from 'sveltyjs';

  import Header from './Header.svelte';
  import Explanation from './Explanation.svelte';
  import UndoPanel from './UndoPanel.svelte';
  import AnimalArray from './AnimalArray.svelte';
  import AnimalMap from './AnimalMap.svelte';

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
    padding: 64px 0 256px 0;
    border-left: 2px solid var(--dark);
    border-right: 2px solid var(--dark);
  }
  action,
  subaction {
    display: block;
    margin: 0 32px;
  }
  subaction ul {
    margin: 8px 0;
  }
  action {
    text-align: center;
    font-size: 150%;
    color: var(--punch);
    margin: 16px auto 0 auto;
  }
</style>

<page>
  <Header />
  <content>
    <Explanation />

    <action>Try it out</action>
    <subaction>
      See what happens when:
      <ul>
        <li>you open this in another tab, then add animals!</li>
        <li>you go offline, do stuff, then re-connect!</li>
      </ul>
    </subaction>

    <UndoPanel {undoManager} />

    <AnimalArray array={list} />

    <AnimalMap map={dict} />
  </content>
</page>
