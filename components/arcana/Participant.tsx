export default function Participant() {
  return (
    <div
      className="h-[102px] w-[313px] rounded-[10px] border border-[#EB6A55] md:w-full lg:max-w-[30%] xl:max-w-[40%]"
      style={{ background: 'linear-gradient(0deg, #98322D 0%, #C84435 50.51%, #E85136 100%)' }}
    >
      <div className="mt-5 ml-5">
        <div className="flex items-center">
          <p className="dota__gold text-sm font-medium">Participants</p>
          <p className="dota__gold flex-1 text-center font-ddin text-2xl font-bold leading-6 text-p12-success">36,639</p>
        </div>
        <div className="mt-3 flex items-center">
          <p className="dota__gold flex-none text-sm font-medium">Prize Pool</p>
          <div className="dota__gold flex flex-1 items-center justify-center text-center font-ddin text-[30px] font-bold leading-[30px]">
            $30,000
          </div>
        </div>
      </div>
    </div>
  );
}
