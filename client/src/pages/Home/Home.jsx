import HeroSection from './sections/HeroSection';
import StatsBar from './sections/StatsBar';
import MissionSection from './sections/MissionSection';
import GetInvolvedSection from './sections/GetInvolvedSection';
import NewsCarousel from './sections/NewsCarousel';

function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <MissionSection />
      <GetInvolvedSection />
      <NewsCarousel />
    </>
  );
}

export default Home;
