"use client";

import React, { useEffect, useRef, useCallback } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, Vector as VectorSource } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import Draw, { createBox, createRegularPolygon } from "ol/interaction/Draw";
import Polygon from "ol/geom/Polygon";
import Feature from "ol/Feature";
import useMapStore from "../store";
import { initializeMap, createGeometryFunction } from "../../utils/map-utils";

const MapClientComponent = ({ shapes }) => {
  const mapElement = useRef();
  const { setMap, drawType } = useMapStore();
  const drawRef = useRef();
  const vectorSourceRef = useRef(new VectorSource({ wrapX: false }));

  useEffect(() => {
    const map = initializeMap(
      mapElement.current,
      setMap,
      vectorSourceRef.current,
    );

    // Add shapes to the map
    console.log(shapes);
    if (shapes?.shapes?.length) {
      shapes.shapes.forEach(({ type, coordinates }) => {
        const geometryFunction = createGeometryFunction(type);
        const geometry = geometryFunction(coordinates);
        const feature = new Feature({ geometry });
        vectorSourceRef.current.addFeature(feature);
      });
    }

    return () => {
      map.setTarget(null);
    };
  }, [setMap, shapes]);

  useEffect(() => {
    const postShape = async (shape) => {
      const res = await fetch("http://localhost:3000/api/shapes", {
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

    const { map } = useMapStore.getState();
    if (!map) return;

    if (drawRef.current) {
      map.removeInteraction(drawRef.current);
    }

    if (drawType === "None") return;

    const geometryFunction = createGeometryFunction(drawType);

    const draw = new Draw({
      source: vectorSourceRef.current,
      type:
        drawType === "Square" || drawType === "Box" || drawType === "Star"
          ? "Circle"
          : drawType,
      geometryFunction,
    });

    draw.on("drawend", (event) => {
      const geometry = event.feature.getGeometry();
      const coordinates = geometry.getCoordinates();
      const shape = {
        type: drawType,
        coordinates,
      };

      if (shape) {
        postShape(shape);
      }
    });

    map.addInteraction(draw);
    drawRef.current = draw;

    return () => {
      if (map) {
        map.removeInteraction(draw);
      }
    };
  }, [drawType]);

  return <div ref={mapElement} style={{ width: "100%", height: "100vh" }} />;
};

export default MapClientComponent;