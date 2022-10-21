import { forwardRef, LegacyRef } from 'react';

type SkillCardProps = {
  votes?: number;
  icon?: string;
  onClick?: () => void;
};

const SkillCard = forwardRef(function SkillCardInner({ votes, icon, onClick }: SkillCardProps, ref: LegacyRef<HTMLDivElement>) {
  return (
    <div className="group relative h-12 w-12 cursor-pointer xs:h-[12.8vw] xs:w-[12.8vw]" onClick={onClick} ref={ref}>
      <img className="absolute z-10 hidden group-hover:block" src="/img/arcana/statusbar/skill_hover.webp" alt="skill_hover" />
      <img className="relative z-10" src="/img/arcana/statusbar/skill_mask.webp" alt="skill_mask" />
      <p className="absolute bottom-1 right-1 z-20 h-[14px] text-xs font-medium leading-[14px] text-p12-link">{votes || 0}</p>
      <div className="absolute top-0 left-0">{icon && <img src={icon} alt="icon" />}</div>
    </div>
  );
});
export default SkillCard;
