import React, { useRef, useState } from 'react';
import { LeftCircle } from '../svg/LeftCircle';
import classNames from 'classnames';
import styles from './tokens.module.css';
import { useClickScroll } from '../../hooks/useClickScroll';

function Tokens() {
  const [tokens] = useState<any[]>([]);
  const [count, setCount] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const enableTabScroll = tokens.length > 4;

  useClickScroll(ref, count);

  return (
    <div className="py-12 px-8">
      <div>
        <div className={classNames('relative', styles.tokens__tab)}>
          {enableTabScroll && (
            <div
              className={classNames('-left-[18px] select-none', styles.tokens__tab__scrollButton)}
              onClick={() => setCount((c) => c - 1)}
            >
              <LeftCircle />
            </div>
          )}
          <div ref={ref} className="horizontal-scroll relative flex w-full overflow-x-auto rounded-t-2xl ">
            <div className="relative whitespace-nowrap">
              {tokens.map((token) => (
                <div
                  key={token}
                  className="mr-[13px] inline-block w-[315px] flex-none cursor-pointer rounded-t-2xl bg-p12-black/60 p-2.5 last:mr-0"
                >
                  <div>{token}</div>
                </div>
              ))}
            </div>
          </div>
          {enableTabScroll && (
            <div
              className={classNames('-right-[18px] select-none', styles.tokens__tab__scrollButton)}
              onClick={() => setCount((c) => c + 1)}
            >
              <LeftCircle className="rotate-180" />
            </div>
          )}
        </div>
        <div className="w-full rounded-b-2xl bg-p12-black/60">
          <p className="h-[600px]">token</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Tokens);
