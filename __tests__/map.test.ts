import * as Y from 'yjs';
import { readableMap } from '../src/main';
import { get } from 'svelte/store';
import subscribeSkipInitial from '../util/subscribeSkipInitial';

describe('map', () => {
  let ydoc: Y.Doc;

  let ymap: Y.Map<string>;

  let store;

  beforeEach(() => {
    ydoc = new Y.Doc();
    ymap = ydoc.getMap('dict');
    store = readableMap(ymap);
  });

  it('has an initial value', () => {
    expect(get(store)).toEqual(new Map());
  });

  it('has a Y type', () => {
    expect(store.y).toBeDefined();
  });

  it('subscribes', (done) => {
    store.subscribe((value) => {
      expect(value).toEqual(new Map());
      done();
    });
  });

  it('subscribes and gets change', (done) => {
    subscribeSkipInitial(store, (value) => {
      expect(value).toEqual(new Map([['greeting', 'hello']]));
      done();
    });
    store.y.set('greeting', 'hello');
  });

  it('unsubscribes', (done) => {
    const unsub = subscribeSkipInitial(store, (_) => {
      fail(`shouldn't happen`);
    });
    unsub();

    subscribeSkipInitial(store, (value) => {
      expect(value).toEqual(new Map([['hello', 'there']]));
      done();
    });

    store.y.set('hello', 'there');
  });

  it('can set a key/value via y', (done) => {
    store.y.set('one', '1');

    subscribeSkipInitial(store, (value) => {
      expect(value).toEqual(
        new Map([
          ['one', '1'],
          ['two', '2'],
        ]),
      );
      done();
    });

    store.y.set('two', '2');
  });

  it('can delete a key/value via y', (done) => {
    store.y.set('one', '1');
    store.y.set('two', '2');

    subscribeSkipInitial(store, (value) => {
      expect(value).toEqual(new Map([['one', '1']]));
      done();
    });

    store.y.delete('two');
  });
});
