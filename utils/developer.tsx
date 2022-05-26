import { FailedGameMessage } from '../lib/types';

export const getErrorToast = (data: FailedGameMessage[]) => {
  return (
    <div>
      {data.map((item) => (
        <p key={item.appid}>
          {item.appid} {item.msg}
        </p>
      ))}
    </div>
  );
};
