import classNames from 'classnames';

type CollabItemProps = {
  hover?: boolean;
  steamStore?: boolean;
  // TODO: data: Partial<CollabInfo>;
};
export function CollabListItem({ hover }: CollabItemProps) {
  return (
    <div
      className={classNames(
        'overflow-hidden rounded-2xl bg-p12-black/80 p-4 xs:px-2',
        hover ? 'cursor-pointer hover:bg-[#7980AF]/20' : '',
      )}
    >
      item
    </div>
  );
}
