import Script from 'next/script';
import { useEvent, useInterval } from 'react-use';
import { useEffect, useRef, useState } from 'react';
import butterflyHelpers from './butterflyHelpers';

const themes: Record<any, number[]> = {
  ['p12-theme-01']: [0xff9e76, 0xa011ff],
  ['p12-theme-02']: [0xa3d365, 0x09bda0],
  ['p12-theme-03']: [0xffb876, 0xd9214d],
  ['p12-theme-04']: [0x3592ff, 0xa072ff],
};

export default function ButterflyGL() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [defaultProperties, setDefaultProperties] = useState({});
  const [visibility, setVisibility] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const butterflyRef = useRef<any>(null);
  const posRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const timeRef = useRef<number>(+new Date() / 1000);
  const animationIdRef = useRef<number>();

  useEvent('visibilitychange', () => {
    setVisibility(!visibility || document.visibilityState !== 'hidden');
  });

  useEvent('mousemove', (event) => {
    const butterfly = butterflyRef.current;
    const container = containerRef.current;
    if (butterfly && container) {
      const pos = butterflyHelpers.getInputXY(event, container);
      butterfly.properties.mouse.set(pos.x, pos.y);
      butterfly.draw(posRef.current.x, posRef.current.y, pos.x, pos.y);
      posRef.current = pos;
    }
  });

  useEvent('click', () => {
    butterflyRef.current?.reset();
  });

  useEvent('resize', () => {
    butterflyRef.current?.resize(window.innerWidth, window.innerHeight);
  });

  useInterval(
    () => {
      const butterfly = window.hpgButterfly;
      if (butterfly) {
        butterfly.properties = butterflyHelpers.startParamDrift(defaultProperties, butterfly.properties);
      }
    },
    visibility ? 6000 : null,
  );

  useEffect(() => {
    if (isLoaded) {
      const className = document.documentElement.classList[0];
      const theme = themes[className] || themes['p12-theme-01'];
      const butterfly = window.hpgButterfly;
      if (!butterfly) return;
      const _defaultProperties = butterflyHelpers.defaultProperties;
      _defaultProperties.color1Hex = theme[0];
      _defaultProperties.color2Hex = theme[1];
      if (!butterfly.checkIsSupported(canvasRef.current)) {
        return;
      }
      butterfly.init();
      butterfly.properties.scene.children = butterfly.properties.scene.children.filter((v: any) => v.type !== 'Object3D');
      Object.assign(butterfly.properties, _defaultProperties);
      butterfly.resize(window.innerWidth, window.innerHeight);
      setVisibility(true);
      butterflyRef.current = butterfly;
      setDefaultProperties(_defaultProperties);
    }
  }, [isLoaded]);

  useEffect(() => {
    const butterfly = butterflyRef.current;
    if (visibility && butterfly) {
      butterfly.reset();
      let diffTime = 0.02;
      const loop = () => {
        const currentTime = +new Date() / 1000;
        if (currentTime - timeRef.current >= diffTime) {
          butterfly.render(currentTime - timeRef.current);
          timeRef.current = currentTime;
        }
        animationIdRef.current = requestAnimationFrame(loop);
      };
      loop();
    }
    return () => {
      if (animationIdRef.current) {
        butterfly && butterfly.reset();
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = undefined;
      }
    };
  }, [visibility]);

  return (
    <>
      <Script
        id="butterfly"
        src="https://cdn1.p12.games/js/butterfly@1.0.2.min.js"
        strategy="lazyOnload"
        onLoad={() => setIsLoaded(true)}
      />
      <div ref={containerRef} className="butterfly-gl animate-fadeIn fixed bottom-0 left-0 right-0 top-0 -z-20">
        <canvas ref={canvasRef} className="butterfly-canvas absolute h-full w-full"></canvas>
      </div>
    </>
  );
}
