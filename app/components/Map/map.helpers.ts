import { createGeometryFunction } from "@/app/utils/map-utils";
import { Feature } from "ol";
import { MultiPolygon } from "ol/geom";
import Draw from "ol/interaction/Draw";

const url: string = "http://localhost:3000/api";

export const getFeature = (coordinates: any[], type: string) => {
  const geometryFunction = createGeometryFunction(type);
  // const geometry = geometryFunction(coordinates);
  const geometry = new MultiPolygon([coordinates]);
  const feature = new Feature({ geometry });
  return feature;
};

export const postShape = async (shape) => {
  const res = await fetch(`${url}/shapes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shape),
  });
  if (!res.ok) {
    return [];
  }
  return res.json();
};

export const handleDrawEnd = (event, drawType) => {
  const geometry = event.feature.getGeometry();
  let calcGeometry = geometry;
  if (geometry?.geometries_) {
    calcGeometry = geometry?.geometries_[0];
  }
  console.log(geometry);
  const coordinates = calcGeometry.getCoordinates();
  const shape = {
    type: drawType,
    coordinates,
  };

  if (shape) {
    postShape(shape);
  }
};

export const getDraw = (vectorSourceRef, drawType): Draw => {
  const geometryFunction = createGeometryFunction(drawType);
  const draw = new Draw({
    source: vectorSourceRef.current,
    type:
      drawType === "Square" || drawType === "Box" || drawType === "Star"
        ? "Circle"
        : drawType,
    geometryFunction,
  });
  return draw;
};
