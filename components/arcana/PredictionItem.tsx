export default function PredictionItem({ selected }: { selected?: boolean }) {
  return (
    <div className="rounded-2xl bg-p12-black/80 backdrop-blur-xl">
      <div className="flex items-center justify-items-start rounded-t-2xl bg-gradient-prediction p-5">
        <img src="/img/p12_white.png" width={38} height={38} alt="p12_white" />
        <div className="ml-3">
          <p className="text-sm">
            <span className="font-medium text-p12-link">Project Twelve</span>&nbsp; sponsored this prediction
          </p>
          <p className="text-sm text-p12-orange">&quot;  Sumail&apos;s 31 kill Tiny can&apos;t save EG. &quot;</p>
        </div>
      </div>
      <div className="h-0.5 bg-p12-gradient"></div>
      <div className="flex flex-col items-center py-8">
        <h2 className="text-[30px] font-medium">Killing Machine</h2>
        <p>Player with most Kills in a single game</p>
        <div className="mt-8 h-[260px] w-[260px]">
          {selected ? (
            <img className="w-full" src="/img/arcana/sumail.png" alt="sumail" />
          ) : (
            <img className="w-full" src="/img/arcana/no_selected.png" alt="no_selected" />
          )}
        </div>
        <div className="mt-5 h-[36px] text-[30px] font-medium">{selected ? 'Sumail' : null}</div>
        <div className="mt-[60px] text-center">
          <h3 className="font-medium">Total Voter</h3>
          <p className="font-ddin text-5xl font-bold">8898</p>
        </div>
      </div>
    </div>
  );
}
