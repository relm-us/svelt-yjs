import * as Y from 'yjs'
import { array } from '../src/main'
import { get } from 'svelte/store'
import subscribeSkipInitial from '../util/subscribeSkipInitial'


describe('array', () => {
  let ydoc: Y.Doc

  let yarray: Y.Array<string>


  beforeEach(() => {
    ydoc = new Y.Doc()
    yarray = ydoc.getArray('list')
  })

  describe.each([['readable'], ['writable']])("%s", (type) => {
    let store

    beforeEach(() => {
      store = array[type](yarray)
    })

    it('has an initial value', () => {
      expect(get(store)).toEqual([])
    })

    it('has a Y type', () => {
      expect(store.y).toBeDefined()
    })

    it('subscribes', (done) => {
      store.subscribe(value => {
        expect(value).toEqual([])
        done()
      })
    })

    it('subscribes and gets change', (done) => {
      subscribeSkipInitial(store, value => {
        expect(value).toEqual(['hello'])
        done()
      })
      yarray.push(['hello'])
    })

    it('unsubscribes', (done) => {
      const unsub = subscribeSkipInitial(store, _ => {
        fail(`shouldn't happen`)
      })
      unsub()

      subscribeSkipInitial(store, value => {
        expect(value).toEqual(['hello'])
        done()
      })

      yarray.push(['hello'])
    })
  })

  describe('writing to writable', () => {
    let store

    beforeEach(() => {
      store = array.writable(yarray)
    })

    it('set', (done) => {
      subscribeSkipInitial(store, value => {
        expect(value).toEqual(['one', 'two'])
        done()
      })
      store.set(['one', 'two'])
    })

    it('update', done => {
      store.set(['one'])
      subscribeSkipInitial(store, value => {
        expect(value).toEqual(['one', 'two'])
        done()
      })
      store.update(items => {
        const ret = [...items, 'two']
        console.log('items', items, ret)
        return ret
      })
    })

    it('insert via y', done => {
      store.set(['one', 'four'])
      subscribeSkipInitial(store, value => {
        expect(value).toEqual(['one', 'two', 'three', 'four'])
        done()
      })
      store.y.insert(1, ['two', 'three'])
    })
  })
})
