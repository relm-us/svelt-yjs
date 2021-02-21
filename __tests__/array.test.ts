import * as Y from 'yjs';
import { readableArray } from '../src/main';
import { get } from 'svelte/store';
import subscribeSkipInitial from '../util/subscribeSkipInitial';

describe('array', () => {
  let ydoc: Y.Doc;

  let yarray: Y.Array<string>;

  let store;

  beforeEach(() => {
    ydoc = new Y.Doc();
    yarray = ydoc.getArray('list');
    store = readableArray(yarray);
  });

  it('has an initial value', () => {
    expect(get(store)).toEqual([]);
  });

  it('has a Y type', () => {
    expect(store.y).toBeDefined();
  });

  it('subscribes', (done) => {
    store.subscribe((value) => {
      expect(value).toEqual([]);
      done();
    });
  });

  it('subscribes and gets change', (done) => {
    subscribeSkipInitial(store, (value) => {
      expect(value).toEqual(['hello']);
      done();
    });
    yarray.push(['hello']);
  });

  it('unsubscribes', (done) => {
    const unsub = subscribeSkipInitial(store, (_) => {
      fail(`shouldn't happen`);
    });
    unsub();

    subscribeSkipInitial(store, (value) => {
      expect(value).toEqual(['hello']);
      done();
    });

    yarray.push(['hello']);
  });

  it('can insert via y', (done) => {
    store.y.insert(0, ['one', 'four']);

    subscribeSkipInitial(store, (value) => {
      expect(value).toEqual(['one', 'two', 'three', 'four']);
      done();
    });

    store.y.insert(1, ['two', 'three']);
  });

  it('can delete via y', (done) => {
    store.y.insert(0, ['one', 'two', 'three']);

    subscribeSkipInitial(store, (value) => {
      expect(value).toEqual(['one', 'three']);
      done();
    });

    store.y.delete(1);
  });
});
