import Image from "next/image";
import SlidingPanel from "./components/sliding-panel/sliding-panel";
import MapServerComponent from "./components/Map/map-server-component";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>OpenLayers Map with Zustand in Next.js 13</h1>
      <MapServerComponent />
      <SlidingPanel />
    </main>
  );
}
