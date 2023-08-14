import { openLink } from '../../../utils';

type EasterEggProps = {
  onMaskClick?: () => void;
  show?: boolean;
  level?: number;
};

function EasterItemLevel25() {
  const onClick = () => {
    openLink('https://www.youtube.com/watch?v=P6W2jD1RCbU');
  };
  return (
    <div>
      <h3 className="dota__yellow text-sm font-semibold">BEST Chat Wheel ?</h3>
      <div
        className="mt-2 grid w-full grid-cols-4 gap-3 xs:grid-cols-2 xs:gap-1.5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="dota__easter w-[168px] py-2 text-center xs:w-auto" onClick={onClick}>
          <p className="dota__yellow">A</p>
          <p className="text-xs">Lakad Matataaag! Normalin, Normalin.</p>
        </div>
        <div className="dota__easter w-[168px] text-center xs:w-auto" onClick={onClick}>
          <p className="dota__yellow mt-2">B</p>
          <p className="mt-2 text-xs">你气不气?</p>
        </div>
        <div className="dota__easter w-[168px] text-center xs:w-auto" onClick={onClick}>
          <p className="dota__yellow mt-2">C</p>
          <p className="mt-2 text-xs">Это ГГ</p>
        </div>
        <div className="dota__easter w-[168px] py-2 text-center xs:w-auto" onClick={onClick}>
          <p className="dota__yellow">D</p>
          <p className="text-xs">Ding Ding Ding Mother******</p>
        </div>
      </div>
    </div>
  );
}

function EasterItemLevel1() {
  const onClick = () => {
    openLink('https://www.bilibili.com/video/BV1Kr4y1i7Qv');
  };
  return (
    <div>
      <h3 className="dota__yellow text-sm font-semibold">Select your favourite hero</h3>
      <div className="mt-2 grid w-full grid-cols-3 gap-3" onClick={(event) => event.stopPropagation()}>
        <div className="dota__easter h-[76px] w-[168px] px-4 text-center xs:w-auto" onClick={onClick}>
          <p className="dota__yellow mt-2">A</p>
          <p className="mt-2 text-sm">Marci</p>
        </div>
        <div className="dota__easter h-[76px] w-[168px] px-4 text-center xs:w-auto" onClick={onClick}>
          <p className="dota__yellow mt-2">B</p>
          <p className="mt-2 text-sm">玛西</p>
        </div>
        <div className="dota__easter h-[76px] w-[168px] px-4 text-center xs:w-auto" onClick={onClick}>
          <p className="dota__yellow mt-2">C</p>
          <p className="flex items-center justify-center">
            <img width={68} src="/img/arcana/statusbar/marci.webp" alt="marci" />
          </p>
        </div>
      </div>
    </div>
  );
}

export default function EasterEgg({ show, level, onMaskClick }: EasterEggProps) {
  return (
    <div>
      {show && (
        <div
          className="absolute z-30 flex h-full w-[750px] items-center justify-center bg-black/50 backdrop-blur md:w-full"
          onClick={onMaskClick}
        >
          {level === 1 && <EasterItemLevel1 />}
          {level === 25 && <EasterItemLevel25 />}
        </div>
      )}
    </div>
  );
}
