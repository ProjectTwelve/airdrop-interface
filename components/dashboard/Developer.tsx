import Verify from '@/components/developer/Verify';
import GameList from '@/components/developer/GameList';

export default function Developer() {
  return (
    <div className="backdrop-box mt-15 rounded-2xl">
      <div className="px-8 pt-9">
        <GameList />
      </div>
      <Verify />
    </div>
  );
}
