import { atom } from 'recoil';

export const downloadClickAtom = atom({
  key: 'download_click',
  default: false,
});

export const isConnectPopoverOpen = atom({
  key: 'connect_popover_open',
  default: false,
});
