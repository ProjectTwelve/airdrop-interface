type MessageProps = {
  title?: JSX.Element | string;
  message: JSX.Element | string;
};

export default function Message({ title, message }: MessageProps) {
  return (
    <div className="py-2">
      {title && <h5 className="mb-4 text-lg font-medium">{title}</h5>}
      <div className="text-sm">{message}</div>
    </div>
  );
}
