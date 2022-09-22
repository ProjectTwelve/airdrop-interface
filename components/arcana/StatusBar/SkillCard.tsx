type SkillCardProps = {
  votes?: number;
  icon?: string;
  onClick?: () => void;
};

export default function SkillCard({ votes, icon, onClick }: SkillCardProps) {
  return (
    <div className="group relative h-16 w-16 cursor-pointer xs:h-[12.8vw] xs:w-[12.8vw]" onClick={onClick}>
      <img className="absolute z-10 hidden group-hover:block" src="/img/arcana/statusbar/skill_hover.webp" alt="skill_hover" />
      <img className="relative z-10" src="/img/arcana/statusbar/skill_mask.webp" alt="skill_mask" />
      <p className="absolute bottom-1.5 right-1.5 z-20 h-[14px] font-medium leading-[14px] text-p12-link xs:text-xs">{votes}</p>
      <div className="absolute top-0 left-0">
        <img src={icon} alt="icon" />
      </div>
    </div>
  );
}
