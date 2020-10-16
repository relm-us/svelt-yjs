export default function subscribeSkipInitial(store, callback) {
  let count = 0
  return store.subscribe(value => {
    if (count++ > 0) {
      callback(value)
    }
  })
}
