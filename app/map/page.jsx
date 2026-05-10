import MapBanner from "@/app/map/MapBanner";
import LiveMap from "@/app/Components/Reusable/LiveMap";
import LeftSidebar from '../../app/map/LeftSidebar'
import SosModal from '../map/SosModal'

export default function MapPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <MapBanner />

      <div className="pt-4 mb-5">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="order-2 md:order-1">
            <LeftSidebar></LeftSidebar>
          </div>
          <div className="order-1 md:order-2 w-[86vw] md:w-[61.5vw] ml-5 md:ml-0">
            <LiveMap />
          </div>
        </div>
      </div>
      <SosModal></SosModal>
    </main>
  );
}