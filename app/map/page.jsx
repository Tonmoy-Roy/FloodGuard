"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MapBanner from "@/app/map/MapBanner";
import LiveMap from "@/app/Components/Reusable/LiveMap";
import LeftSidebar from "../../app/map/LeftSidebar";
import SosModal from "../map/SosModal";

function MapContent() {
  const searchParams = useSearchParams();
  const shouldOpenSos = searchParams.get("openSos") === "true";

  return (
    <>
      <MapBanner />

      <div className="pt-4 mb-5">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="order-2 md:order-1">
            <LeftSidebar />
          </div>
          <div className="order-1 md:order-2 w-[86vw] md:w-[61.5vw] ml-5 md:ml-0 mt-12">
            <LiveMap />
          </div>
        </div>
      </div>
      <SosModal autoOpen={shouldOpenSos} />
    </>
  );
}

export default function MapPage() {
  return (
    <main className="min-h-screen dark:bg-gray-950">
      <Suspense fallback={null}>
        <MapContent />
      </Suspense>
    </main>
  );
}