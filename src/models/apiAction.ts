import { Observable } from 'rxjs';

/** async state common attributes */
// export interface AsyncState {
//   isPending: boolean;
//   isFailure: boolean;
// }

export interface ApiActionPayload<T> {
  /** Promise call from API */
  call: Observable<T>;
}