import { useRef, useEffect, useCallback } from 'react';
import _ from 'lodash-es';

/**
 * 它返回传入函数的节流版本，每 `delay` 毫秒仅调用一次
 * @param {any} fn - 节流功能
 * @param [delay=300] - 调用受限函数之间等待的时间量。
 * @returns 一个被 300ms 限制的函数
 */
export function useThrottle(fn: any, delay = 300) {
  const options = { leading: true, trailing: false }; // add custom lodash options
  const fnRef = useRef(fn);
  const lastPromiseRef = useRef<Promise<any> | null>(null);

  // use mutable ref to make useCallback/throttle not depend on `fn` dep
  useEffect(() => {
    fnRef.current = fn;
  });

  const throttledFn = _.throttle(
    async (...args) => {
      if (lastPromiseRef.current) {
        // 如果存在上一个 Promise，取消它
        throttledFn.cancel();
      }
      const promise = fnRef.current(...args);
      lastPromiseRef.current = promise;
      return promise;
    },
    delay,
    options,
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(throttledFn, [delay]);
}
