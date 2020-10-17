import * as Y from 'yjs';
import { readable as svelteReadable } from 'svelte/store';

function readable(undoManager: Y.UndoManager) {
  const stackCount = svelteReadable({ undoSize: 0, redoSize: 0 }, (set) => {
    let undoSize = 0;
    let redoSize = 0;

    const updateStackSizes = () => {
      undoSize = undoManager.undoStack.length;
      redoSize = undoManager.redoStack.length;
      set({ undoSize, redoSize });
    };

    const added = (/* { stackItem,  type } */) => {
      updateStackSizes();
    };

    const popped = (/* { stackItem,  type } */) => {
      updateStackSizes();
    };

    undoManager.on('stack-item-added', added);
    undoManager.on('stack-item-popped', popped);

    return () => {
      // clean up when readable store is unsubscribed
      undoManager.off('stack-item-added', added);
      undoManager.off('stack-item-popped', popped);
    };
  });

  return stackCount;
}

export { readable };
