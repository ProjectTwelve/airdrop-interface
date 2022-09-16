export default function MainCard() {
  return (
    <div className="relative w-[462px] bg-[url('/img/arcana/statusbar/center.webp')] bg-cover bg-no-repeat px-4 py-2.5">
      <div className="absolute -top-8 left-4 h-8 w-16">
        <img src="/img/arcana/statusbar/skill_add.webp" alt="add" />
      </div>
      <div className="flex h-16 justify-between">
        <div className="flex">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, #FFFF91 0%, #FFFF98 29.14%, #D18C53 71.76%, #714E37 100%)',
            }}
          >
            <span className="h-[30px] bg-gradient-to-b from-[#541718] to-[#AD7442] bg-clip-text text-[36px] font-bold leading-[32px] text-transparent">
              0
            </span>
          </div>
          <div className="ml-2.5">
            <p className="h-[24px] text-sm font-medium text-p12-gold">MultiCast Votes</p>
            <img width={60} src="/img/arcana/statusbar/multicast.webp" className="activity mt-1.5" alt="multicast" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="relative h-16 w-16">
            <img className="relative z-10" src="/img/arcana/statusbar/skill_mask.webp" alt="skill_mask" />
            <p className="absolute bottom-1.5 right-1.5 z-20 h-[14px] font-medium leading-[14px] text-p12-link">20</p>
            <div className="absolute top-0 left-0 m-0.5">
              <img src="https://cdn1.p12.games/airdrop/img/gamer_badge_blue.png" alt="gamer_badge" />
            </div>
          </div>
          <div className="relative h-16 w-16">
            <img className="relative z-10" src="/img/arcana/statusbar/skill_invite.webp" alt="skill_mask" />
            <p className="absolute bottom-1.5 right-1.5 z-20 h-[14px] font-medium leading-[14px] text-p12-link">20</p>
          </div>
          <div className="relative h-16 w-16">
            <img className="relative z-10" src="/img/arcana/statusbar/skill_task.webp" alt="skill_mask" />
            <p className="absolute bottom-1.5 right-1.5 z-20 h-[14px] font-medium leading-[14px] text-p12-link">20</p>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex h-[30px] items-center justify-between rounded bg-[url('/img/arcana/statusbar/health.webp')] bg-cover bg-no-repeat px-3">
          <p className="flex-none text-sm" style={{ textShadow: '0 0 6px #000000' }}>
            Invite with <span className="text-p12-link">Referral link</span>
          </p>
          <div className="relative ml-2 h-[24px] truncate pr-11 text-p12-gold">
            <span className="text-[10px] text-p12-gold"></span>
            <button className="copy__btn absolute top-0.5 right-0 h-[20px] w-[44px]">copy</button>
          </div>
        </div>
        <div className="relative mt-1 flex h-[30px] items-center justify-center overflow-hidden rounded bg-[url('/img/arcana/statusbar/mana_bg.webp')] bg-cover bg-no-repeat">
          <img
            src="/img/arcana/statusbar/mana.webp"
            alt="mana"
            className="absolute left-0 top-0 h-full w-4/5 object-none object-left"
          />
          <p className="relative z-10 text-sm" style={{ textShadow: '0 0 6px #000000' }}>
            6/8
          </p>
        </div>
      </div>
    </div>
  );
}
