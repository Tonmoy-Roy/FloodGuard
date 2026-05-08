import Navbar from "./Components/Layout/Navbar";
import EmergencyServicesSection from "./Components/Sections/HomePage/EmergencyService";
import HeroSection from "./Components/Sections/HomePage/Hero";
import LiveMap from "./Components/Sections/HomePage/LiveMap";
import VolunteerSection from "./Components/Sections/HomePage/VolunteerSection";
import SuccesStories from "./Components/Sections/HomePage/SuccesStories";
import Footer from "./Components/Layout/Footer";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <LiveMap></LiveMap>
      <EmergencyServicesSection></EmergencyServicesSection>
      <VolunteerSection></VolunteerSection>
      <SuccesStories></SuccesStories>
      <Footer></Footer>
    </div>
  );
}
