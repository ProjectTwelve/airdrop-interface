import { atom } from 'recoil';
import { UserPowerLevel } from '@/lib/types-nest';

export const userPowerLevelAtom = atom<UserPowerLevel>({
  key: 'user_power_level_atom',
  default: {
    activatedPL: 0, // Gamer + Developer = Current
    gamerPL: 0, // Arcana Gamer + Steam Gamer  = Gamer
    developerPL: 0, // Arcana Developer + Steam Developer = Developer
    arcanaPL: 0, // Arcana Gamer + Arcana Developer = Arcana
    arcanaGamerPL: 0, // Arcana Gamer
    arcanaDeveloperPL: 0, // Arcana Developer
    steamGamerPL: 0, // Steam Gamer
    steamDeveloperPL: 0, // Steam Developer
  },
});

export const dashboardSelectedTabAtom = atom<number>({
  key: 'dashboard_selected_tab_atom',
  default: 0,
});
