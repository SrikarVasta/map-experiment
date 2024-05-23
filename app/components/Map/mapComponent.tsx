'use client';

import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import useMapStore from '../store';
import { initializeMap, addDrawInteraction } from '../../utils/map-utils';

const MapComponent = () => {
  const mapElement = useRef();
  const { setMap, drawType } = useMapStore();
  const drawRef = useRef();

  useEffect(() => {
    const map = initializeMap(mapElement.current, setMap);

    return () => {
      map.setTarget(null);
    };
  }, [setMap]);

  useEffect(() => {
    const { map } = useMapStore.getState();
    if (!map) return;

    if (drawRef.current) {
      map.removeInteraction(drawRef.current);
    }

    const draw = addDrawInteraction(map, drawType);
    drawRef.current = draw;

    return () => {
      if (map) {
        map.removeInteraction(draw);
      }
    };
  }, [drawType]);

  return <div ref={mapElement} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;