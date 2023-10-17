import classNames from 'classnames';

type MessageProps = {
  title?: JSX.Element | string;
  message?: JSX.Element | string;
};

export default function Message({ title, message }: MessageProps) {
  return (
    <div className="py-2">
      {title ? <h5 className={classNames('text-lg font-medium', { 'mb-4': message })}>{title}</h5> : null}
      {message ? <div className="text-sm">{message}</div> : null}
    </div>
  );
}
