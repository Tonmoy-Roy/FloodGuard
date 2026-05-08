import MapBanner from "@/app/map/MapBanner";
import LiveMap from "@/app/Components/Sections/HomePage/LiveMap";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* ম্যাপের উপরের এলার্ট ব্যানার */}
      <MapBanner /> 
      
      <div className="pt-4">
        {/* মূল ম্যাপ কম্পোনেন্টটি এখানে যোগ করলাম */}
        <LiveMap />
      </div>
    </main>
  );
}