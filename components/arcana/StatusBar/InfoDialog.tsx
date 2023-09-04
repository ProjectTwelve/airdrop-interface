import Button from '../../button';

export default function InfoDialog({ close }: { close: () => void }) {
  return (
    <div className="max-w-[540px]">
      <h2 className="mt-5 text-center text-xl font-medium text-green">What is P12 Arcana @ TI11?</h2>
      <p className="mt-4 text-sm leading-6">
        Make your pick for the tips & predictions of The International 2022, the biggest esports tournament of the year! Unlock
        the splendid treasure chest prepared by P12 and sponsors! Super-duper rare drop list for every Dota Fans!
      </p>
      <h2 className="mt-12 text-center text-xl font-medium text-green">How to join P12 Arcana @ TI11?</h2>
      <p className="mt-4 text-sm leading-6">
        There will be several witty tips & predictions. EVERYONE can join and become a tipster. Be noted that some tips &
        prediction may need finishing specific tasks to unlock.
      </p>
      <h2 className="mt-12 text-center text-xl font-medium text-orange">What is the prize pool?</h2>
      <p className="mt-4 text-sm leading-6">
        P12 with sponsors set splendid treasure chest for P12 Arcana @ TI11. EVERYONE who makes at least one correct pick will
        be rewarded. Rewards will be influenced by votes, which can be MULTICAST by inviting friends, etc.
      </p>
      <div className="mt-12 flex justify-end">
        <Button onClick={close} type="bordered">
          Confirm
        </Button>
      </div>
    </div>
  );
}
