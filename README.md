# Sveltyjs

[Sveltyjs](https://github.com/relm-us/sveltyjs) is a library for your Svelte app
that lets you build Svelte stores from Yjs types. When built on the client-side Yjs
library, your Svelte app gets transport-agnostic synchronization (e.g.
[y-webrtc](https://github.com/yjs/y-webrtc),
[y-websocket](https://github.com/yjs/y-websocket) ) across networks and
undo/redo management basically for free.

[Yjs](https://yjs.dev) is often thought of as a way to make collaborative text
editing work in a browser, but its underlying technology is amenable to a
variety of web use cases. We think [Svelte](https://svelte.dev) and Yjs are
positioned to make collaborative,
[local-first](https://www.inkandswitch.com/local-first.html) apps much easier to
build.

At [Relm](https://github.com/relm-us), for example, we've been using it as the
synchronization layer between participants in a [collaborative 3D
world](https://www.relm.us). 

## Live Demo

See https://sveltyjs.dev

Open it up in multiple browsers at the same time!

## Getting Started

Starting with a Svelte component:

```svelte
<script lang="ts">
  import { array, map } from 'sveltyjs'
  import * as Y from 'yjs'

  // All Yjs types must be embedded in a Y.Doc
  const ydoc: Y.Doc = new Y.Doc()

  // Create a Y.Array in the Y.Doc
  const yarray: Y.Array<string> = ydoc.getArray('list')

  // Generate a Svelte readable store from the Y.Array
  const list = array.readable(yarray)

  // The store has a `y` object that references `yarray`
  // Note: The following is identical to `yarray.push(['one', 'two', 'three'])`
  //       See Yjs docs for other methods on Y.Array.
  list.y.push(['one', 'two', 'three'])
</script>

{#each $list as item, i}
  <div>
    {item}
    <button on:click={() => list.y.delete(i)}>remove</button>
  </div>
{/each}
```

## License

MIT
