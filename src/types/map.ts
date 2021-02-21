import type * as Y from 'yjs';

import { Readable } from './Readable';

export type YReadableMap<T> = Readable<Map<string, T>> & { y: Y.Map<T> };

export function readableMap<T>(map: Y.Map<T>): YReadableMap<T> {
  let value: Map<string, T> = new Map(Object.entries(map.toJSON()));
  let subs = [];

  const setValue = (newValue: Map<string, T>) => {
    if (value === newValue) return;
    // update stored value so new subscribers can get the initial value
    value = newValue;

    // call all handlers to notify of new value
    subs.forEach((sub) => sub(value));
  };

  const observer = (event, _transaction) => {
    const target = event.target as Y.Map<T>;
    setValue(new Map(Object.entries(target.toJSON())));
  };

  const subscribe = (handler) => {
    subs = [...subs, handler];

    if (subs.length === 1) {
      // set an observer to call all handlers whenever there is a change
      map.observe(observer);
    }

    // call just this handler once when it first subscribes
    handler(value);

    // return unsubscribe function
    return () => {
      subs = subs.filter((sub) => sub !== handler);
      if (subs.length === 0) {
        map.unobserve(observer);
      }
    };
  };

  return { subscribe, y: map };
}
