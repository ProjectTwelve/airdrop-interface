import { useEffect, useRef, useState } from 'react';

export type Options = {
  type?: 'js' | 'css';
  js?: Partial<HTMLScriptElement>;
  css?: Partial<HTMLStyleElement>;
};

// {[path]: count}
// remove external when no used
const EXTERNAL_USED_COUNT: Record<string, number> = {};

export type Status = 'unset' | 'loading' | 'ready' | 'error';

type loadResult = {
  ref: Element;
  status: Status;
};

const loadScript = (path: string, props: HTMLScriptElement | {} = {}): loadResult => {
  const script = document.querySelector(`script[src="${path}"]`);

  if (!script) {
    const newScript = document.createElement('script');
    newScript.src = path;
    Object.assign(newScript, props);
    newScript.setAttribute('data-status', 'loading');
    document.body.appendChild(newScript);

    return {
      ref: newScript,
      status: 'loading',
    };
  }

  return {
    ref: script,
    status: (script.getAttribute('data-status') as Status) || 'ready',
  };
};

const loadCss = (path: string, props: HTMLLinkElement | {} = {}): loadResult => {
  const css = document.querySelector(`link[href="${path}"]`);
  if (!css) {
    const newCss = document.createElement('link');

    newCss.rel = 'stylesheet';
    newCss.href = path;
    Object.assign(newCss, props);
    // IE9+
    const isLegacyIECss = 'hideFocus' in newCss;
    // use preload in IE Edge (to detect load errors)
    if (isLegacyIECss && newCss.relList) {
      newCss.rel = 'preload';
      newCss.as = 'style';
    }
    newCss.setAttribute('data-status', 'loading');
    document.head.appendChild(newCss);

    return {
      ref: newCss,
      status: 'loading',
    };
  }

  return {
    ref: css,
    status: (css.getAttribute('data-status') as Status) || 'ready',
  };
};

const useExternal = (path?: string, options?: Options) => {
  const [status, setStatus] = useState<Status>(path ? 'loading' : 'unset');

  const ref = useRef<Element>();

  useEffect(() => {
    if (!path) {
      setStatus('unset');
      return;
    }
    const pathname = path.replace(/[|#].*$/, '');
    if (options?.type === 'css' || (!options?.type && /(^css!|\.css$)/.test(pathname))) {
      const result = loadCss(path, options?.css);
      ref.current = result.ref;
      setStatus(result.status);
    } else if (options?.type === 'js' || (!options?.type && /(^js!|\.js$)/.test(pathname))) {
      const result = loadScript(path, options?.js);
      ref.current = result.ref;
      setStatus(result.status);
    } else {
      // do nothing
      console.error("Cannot infer the type of external resource, and please provide a type ('js' | 'css'). ");
    }

    if (!ref.current) {
      return;
    }

    if (EXTERNAL_USED_COUNT[path] === undefined) {
      EXTERNAL_USED_COUNT[path] = 1;
    } else {
      EXTERNAL_USED_COUNT[path] += 1;
    }

    const handler = (event: Event) => {
      const targetStatus = event.type === 'load' ? 'ready' : 'error';
      ref.current?.setAttribute('data-status', targetStatus);
      setStatus(targetStatus);
    };

    ref.current.addEventListener('load', handler);
    ref.current.addEventListener('error', handler);
    return () => {
      ref.current?.removeEventListener('load', handler);
      ref.current?.removeEventListener('error', handler);

      EXTERNAL_USED_COUNT[path] -= 1;

      if (EXTERNAL_USED_COUNT[path] === 0) {
        ref.current?.remove();
      }

      ref.current = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return status;
};

export default useExternal;
