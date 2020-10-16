# Sveltyjs

A bridge between [Svelte](https://svelte.dev) and [Yjs](https://yjs.dev). Easily wrap a readable store around a Yjs (CRDT) type.

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
