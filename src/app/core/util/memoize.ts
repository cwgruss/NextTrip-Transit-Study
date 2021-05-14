import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

export function memoizeRxJs<T>(
  func: (...args: any[]) => Observable<T>
): (...args: any[]) => Observable<T>;
export function memoizeRxJs(
  func: (...args: any[]) => Observable<any>
): (...args: any[]) => Observable<any> {
  type MemoizedReturn = ReturnType<typeof func>;
  const funcCache: Map<string, MemoizedReturn> = new Map<
    string,
    MemoizedReturn
  >();

  const memoizedFunc = (...args: any[]) => {
    const cacheKey = JSON.stringify(args);
    const cachedValue = funcCache.get(cacheKey);

    if (typeof cachedValue === 'undefined') {
      const result = func(...args).pipe(shareReplay());
      funcCache.set(cacheKey, result);
      // console.log('Setting ...');
      // console.log(result);

      return result;
    }

    // console.log('Cache hit!');

    return cachedValue;
  };

  return memoizedFunc;
}
