import SwiperCard from './SwiperCard';
import InfoCard from './InfoCard';
import MainCard from './MainCard';

export default function StatusBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto flex w-full max-w-[1000px]">
      <InfoCard />
      <MainCard />
      <SwiperCard />
    </div>
  );
}
