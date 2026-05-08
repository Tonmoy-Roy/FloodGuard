import Navbar from "./Components/Layout/Navbar";
import HeroSection from "./Components/Sections/HomePage/Hero";
import Footer from "./Components/Layout/Footer";
import TopMapBanner from "./map/MapBanner";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <TopMapBanner></TopMapBanner>
      <Footer></Footer>
    </div>
  );
}
