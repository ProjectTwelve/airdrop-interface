import classNames from 'classnames';

type CollabSocialsProps = {
  href?: string; // url
  icon: string;
  label?: string; // label for the link
  className?: string;
  onClick?: () => void;
};
export function CollabSocials({ href, label, icon, className, onClick }: CollabSocialsProps) {
  return (
    <a href={href || '#'} onClick={onClick}>
      <span
        className={classNames('flex items-center gap-1 rounded-[100px] bg-[#4383FF]/20 bg-opacity-20 px-3 py-1', className)}
      >
        <img src={icon} className="h-4 w-4" alt={label || 'icon'}></img>
        {label && <span className="text-xs">{label}</span>}
      </span>
    </a>
  );
}
