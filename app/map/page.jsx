import MapBanner from "@/app/map/MapBanner";
import LiveMap from "@/app/Components/Reusable/LiveMap";
import LeftSidebar from '../../app/map/LeftSidebar'
import SosModal from '../map/SosModal'

export default function MapPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <MapBanner />

      <div className="pt-4 mb-5">
        <div className="md:flex">
          <LeftSidebar></LeftSidebar>
          <LiveMap />
        </div>
      </div>
      <SosModal></SosModal>
    </main>
  );
}