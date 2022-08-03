import { atom } from 'recoil';
import { mockCollabs } from './mock';

export type CollabShortInfo = {
  id: string;
  name: string;
  desc: string;
  logo: string;
  startTime: string; // TODO: 存日期格式 转换格式
  endTime: string;
  whitePaperUrl?: string; // 白皮书icon跳转链接，无则不显示
  badgeChainKey?: string; // TODO: 还不知道是什么形式的链icon
};

export const collabListAtom = atom<CollabShortInfo[]>({
  key: 'collab_list_atom',
  default: mockCollabs,
});

export const collabLayoutIdAtom = atom<number>({
  key: 'collab_layout_id_atom',
  default: 0,
});
