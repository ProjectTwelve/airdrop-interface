import { atom } from 'recoil';

export const arcanaObserverAtom = atom<boolean>({
  key: 'arcana_observer_atom',
  default: false,
});

export const arcanaOriginAddressAtom = atom<string | undefined>({
  key: 'arcana_origin_address_atom',
  default: undefined,
});
