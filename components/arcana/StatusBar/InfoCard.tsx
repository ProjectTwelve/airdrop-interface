export default function InfoCard() {
  return (
    <div className="relative">
      <img className="absolute left-0 top-0 z-10 h-[160px] w-[78px]" src="/img/arcana/statusbar/left.webp" alt="left" />
      <div className="relative ml-[53px] h-[160px] w-[175px] bg-gray-400">
        <img className="absolute top-0 left-0" src="/img/arcana/statusbar/mask.webp" alt="mask" />
        <p className="relative z-10 pt-2 text-center text-p12-gold">steam name</p>
        <div className="absolute bottom-0 right-2">
          <p className="mb-1 flex items-center justify-end text-sm">
            6 <img className="ml-0.5" src="/img/arcana/statusbar/level.svg" alt="level" />
          </p>
          <p className="mb-1 flex items-center justify-end text-sm">
            2004 <img className="ml-0.5" src="/img/arcana/statusbar/year.svg" alt="year" />
          </p>
          <p className="mb-1 flex items-center justify-end text-sm">
            56 <img className="ml-0.5" src="/img/arcana/statusbar/friend.svg" alt="friend" />
          </p>
          <p className="mb-1 flex items-center justify-end text-sm">
            3 <img className="ml-0.5" src="/img/arcana/statusbar/badge.svg" alt="badge" />
          </p>
        </div>
      </div>
    </div>
  );
}
