import type * as Y from 'yjs';

function readable<T>(arr: Y.Array<T>) {
  let value: Array<T> = arr.toArray();
  let subs = [];

  const setValue = (newValue) => {
    if (value === newValue) return;
    // update stored value so new subscribers can get the initial value
    value = newValue;

    // call all handlers to notify of new value
    subs.forEach((sub) => sub(value));
  };

  const observer = (event, _transaction) => {
    const target = event.target as Y.Array<T>;
    setValue(target.toArray());
  };

  const subscribe = (handler) => {
    subs = [...subs, handler];

    if (subs.length === 1) {
      // set an observer to call all handlers whenever there is a change
      arr.observe(observer);
    }

    // call just this handler once when it first subscribes
    handler(value);

    // return unsubscribe function
    return () => {
      subs = subs.filter((sub) => sub !== handler);
      if (subs.length === 0) {
        arr.unobserve(observer);
      }
    };
  };

  return { subscribe, y: arr };
}

export { readable };
