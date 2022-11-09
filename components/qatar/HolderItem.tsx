export default function HolderItem() {
  return (
    <div className="qatar__box flex p-6 md:p-3">
      <div className="h-[146px] w-[146px] bg-gray-600 md:h-[108px] md:w-[108px]"></div>
      <div className="relative ml-6 md:ml-3">
        <h3 className="text-xl leading-6 md:text-sm">Pre-Requisite I</h3>
        <h3 className="mt-5 text-xl leading-6 md:mt-2 md:text-sm">BNB Chain Glory Pass Holder</h3>
        <div className="absolute bottom-0 text-sm leading-6 text-p12-success">You are eligible</div>
      </div>
    </div>
  );
}
