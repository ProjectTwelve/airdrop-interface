import { GenesisRarity } from '@/constants';

export function RarityTag({ rarity = GenesisRarity.Uncommon }: { rarity?: GenesisRarity }) {
  if (rarity === GenesisRarity.Legendary) {
    return (
      <div className="h-5 rounded-full border border-orange bg-orange/20 px-3 text-xs font-normal leading-5 text-orange">
        Legendary
      </div>
    );
  }
  if (rarity === GenesisRarity.Epic) {
    return (
      <div className="h-5 rounded-full border border-purple bg-purple/20 px-3 text-xs font-normal leading-5 text-purple">
        Epic
      </div>
    );
  }
  if (rarity === GenesisRarity.Rare) {
    return (
      <div className="h-5 rounded-full border border-blue bg-blue/20 px-3 text-xs font-normal leading-5 text-blue">Rare</div>
    );
  }
  if (rarity === GenesisRarity.Uncommon) {
    return (
      <div className="h-5 rounded-full border border-green bg-green/20 px-3 text-xs font-normal leading-5 text-green">
        Uncommon
      </div>
    );
  }
  if (rarity === GenesisRarity.Common) {
    return (
      <div className="h-5 rounded-full border border-gray-320 bg-gray-320/20 px-3 text-xs font-normal leading-5 text-gray-320">
        Common
      </div>
    );
  }
}
