"use client";

import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import { Vector as VectorSource } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import Draw from "ol/interaction/Draw";
import useMapStore from "../store";
import { initializeMap } from "../../utils/map-utils";
import { getDraw, getFeature, handleDrawEnd } from "./map.helpers";

const MapClientComponent = ({ shapes }) => {
  const mapElement = useRef();
  const { setMap, drawType } = useMapStore();
  const drawRef = useRef<Draw>();
  const vectorSourceRef = useRef(new VectorSource({ wrapX: false }));

  useEffect(() => {
    const map = initializeMap(mapElement.current, vectorSourceRef.current);

    if (shapes?.shapes?.length) {
      shapes.shapes.forEach(
        ({ type, coordinates }: { type: string; coordinates: any[] }) => {
          const feature = getFeature(coordinates, type);
          vectorSourceRef.current.addFeature(feature);
        },
      );
    }

    const layers = map.getLayers();
    layers.forEach((layer) => {
      if (layer instanceof VectorLayer) {
        layer.setSource(vectorSourceRef.current);
      }
    });

    setMap(map);

    return () => {
      map.setTarget(undefined);
    };
  }, [setMap, shapes]);

  useEffect(() => {
    const { map } = useMapStore.getState();
    if (!map) return;

    if (drawRef.current) {
      map.removeInteraction(drawRef.current);
    }

    if (drawType === "None") return;

    const draw = getDraw(vectorSourceRef, drawType);

    draw.on("drawend", (event) => {
      handleDrawEnd(event, drawType);
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
