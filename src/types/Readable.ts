export type Subscriber<T> = (value: T) => void;
export type Unsubscriber = () => void;
export type Invalidator<T> = (value?: T) => void;
export interface Readable<T> {
  /**
   * Subscribe on value changes.
   * @param run subscription callback
   * @param invalidate cleanup callback
   */
  subscribe(run: Subscriber<T>, invalidate?: Invalidator<T>): Unsubscriber;
}
