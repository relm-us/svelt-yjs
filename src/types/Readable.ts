type Subscriber<T> = (value: T) => void;
type Unsubscriber = () => void;
type Invalidator<T> = (value?: T) => void;
export interface Readable<T> {
  /**
   * Subscribe on value changes.
   * @param run subscription callback
   * @param invalidate cleanup callback
   */
  subscribe(run: Subscriber<T>, invalidate?: Invalidator<T>): Unsubscriber;
}
