export default function SBTHolder() {
  return (
    <div className="w-full bg-[url(/svg/pl/sbt.svg)] bg-contain bg-center bg-no-repeat py-9">
      <h2 className="text-center text-3xl/[42px] font-semibold">Premium SBT Holder</h2>
      <div className="flex-center mx-auto mb-14 mt-12 2xl:w-3/4">
        <div className="flex-1">
          <div className="text-center text-xl/6.5 text-gray-400">Mint Cost</div>
          <div className="mt-2 text-center text-5xl font-semibold">2BNB</div>
        </div>
        <div className="h-14 w-px bg-gray-650" />
        <div className="flex-1">
          <div className="text-center text-xl/6.5 text-gray-400">Mint Date</div>
          <div className="mt-2 text-center text-5xl font-semibold">2023-09</div>
        </div>
        <div className="h-14 w-px bg-gray-650" />
        <div className="flex-1">
          <div className="text-center text-xl/6.5 text-gray-400">PPL Reward</div>
          <div className="text-gradient-yellow mt-2 text-center text-5xl font-bold">10,000</div>
        </div>
      </div>
    </div>
  );
}
