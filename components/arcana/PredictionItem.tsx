export default function PredictionItem({ selected }: { selected?: boolean }) {
  return (
    <div className="rounded-2xl bg-p12-black/80 backdrop-blur-xl">
      <div className="flex items-center justify-items-start rounded-t-2xl bg-gradient-prediction p-5">
        <img src="/img/p12_white.png" width={38} height={38} alt="p12_white" />
        <div className="ml-3">
          <p className="text-sm">
            <span className="font-medium text-p12-link">Project Twelve</span>&nbsp; sponsored this prediction
          </p>
          <p className="text-sm text-p12-orange">Runner-up is the hardcore champion</p>
        </div>
      </div>
      <div className="h-0.5 bg-p12-gradient"></div>
      <div className="flex flex-col items-center py-8">
        <h2 className="text-[30px] font-medium">Runner-up</h2>
        <p>Which team will be the runner-up?</p>
        <div className="mt-8 h-[284px] w-[284px]">
          {selected ? (
            <img className="w-full" src="/img/arcana/psg.lgd.png" alt="psg.lgd" />
          ) : (
            <img className="w-full" src="/img/arcana/no_selected.png" alt="no_selected" />
          )}
        </div>
        <div className="mt-[60px]">
          <h3 className="font-medium">Total Voter</h3>
          <p className="font-ddin text-5xl font-bold">8898</p>
        </div>
      </div>
    </div>
  );
}
