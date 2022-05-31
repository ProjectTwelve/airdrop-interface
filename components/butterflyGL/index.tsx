import Script from 'next/script';
import { useEvent } from 'react-use';
import { useEffect, useRef, useState } from 'react';
import butterflyHelpers from './butterflyHelpers';

const themes = {
  theme1: [0xff9e76, 0xa011ff],
  theme2: [0xa3d365, 0x09bda0],
  theme3: [0xffb876, 0xd9214d],
  theme4: [0x3592ff, 0xa072ff],
};

export default function ButterflyGL() {
  const [isLoaded, setIsLoaded] = useState(false);
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
    butterflyRef.current && butterflyRef.current.reset();
  });

  useEvent('resize', () => {
    butterflyRef.current && butterflyRef.current.resize(window.innerWidth, window.innerHeight);
  });

  useEffect(() => {
    if (isLoaded) {
      const butterfly = window.hpgButterfly;
      const defaultProperties = butterflyHelpers.defaultProperties;
      defaultProperties.color1Hex = themes.theme1[0];
      defaultProperties.color2Hex = themes.theme1[1];
      if (!butterfly.checkIsSupported(canvasRef.current)) {
        return;
      }
      butterfly.init();
      butterfly.properties.scene.children = butterfly.properties.scene.children.filter((v: any) => v.type !== 'Object3D');
      Object.assign(butterfly.properties, defaultProperties);
      butterfly.resize(window.innerWidth, window.innerHeight);
      setVisibility(true);
      butterflyRef.current = butterfly;
    }
  }, [isLoaded]);

  useEffect(() => {
    const butterfly = butterflyRef.current;
    if (visibility && butterfly) {
      butterfly.reset();
      const loop = () => {
        const currentTime = +new Date() / 1000;
        butterfly.render(currentTime - timeRef.current);
        timeRef.current = currentTime;
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
      <Script id="butterfly" src="/js/butterfly.min.js" strategy="lazyOnload" onLoad={() => setIsLoaded(true)} />
      <div ref={containerRef} className="butterfly-gl fixed top-0 left-0 right-0 bottom-0 -z-10 opacity-75">
        <canvas ref={canvasRef} className="butterfly-canvas absolute h-full w-full"></canvas>
      </div>
    </>
  );
}
