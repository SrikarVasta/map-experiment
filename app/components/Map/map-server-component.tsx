"use server";

import MapClientComponent from "./map-client-component";
const url: string = "http://localhost:3000/api";

const fetchShapes = async () => {
  const res = await fetch(`${url}/shapes`, { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  const shapes = await res.json();
  return shapes;
};

const MapServerComponent = async () => {
  const shapes = await fetchShapes();

  return <MapClientComponent shapes={shapes} />;
};

export default MapServerComponent;
