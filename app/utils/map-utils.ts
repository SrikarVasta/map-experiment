import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM, Vector as VectorSource } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import Draw, { createBox, createRegularPolygon } from 'ol/interaction/Draw';
import Polygon, { circular } from 'ol/geom/Polygon';
import { GeometryCollection, Point } from 'ol/geom';
import { transform } from 'ol/proj';
import {getDistance} from 'ol/sphere.js';

export const initializeMap = (target,source) => {
  const raster = new TileLayer({
    source: new OSM(),
  });

  // const source = new VectorSource({ wrapX: false });

  const vector = new VectorLayer({
    source: source,
  });

  const map = new Map({
    layers: [raster, vector],
    target,
    view: new View({
      center: [-11000000, 4600000],
      zoom: 5,
    }),
  });


  return map;
};

export const createGeometryFunction = (type) => {
  switch (type) {
    case 'Square':
      return createRegularPolygon(4);
    case 'Circle':
      return (coordinates,geometry,projection) => {
        if (!geometry) {
          geometry = new GeometryCollection([
            new Polygon([]),
            new Point(coordinates[0]),
          ]);
        }
        const geometries = geometry.getGeometries();
        const center = transform(coordinates[0], projection, 'EPSG:4326');
        const last = transform(coordinates[1], projection, 'EPSG:4326');
        const radius = getDistance(center, last);
        const circle = circular(center, radius, 128);
        circle.transform('EPSG:4326', projection);
        geometries[0].setCoordinates(circle.getCoordinates());
        geometry.setGeometries(geometries);
        return geometry;
      }
      case 'Box':
        return createBox()
    case 'Star':
      return (coordinates, geometry) => {
        const center = coordinates[0];
        const last = coordinates[coordinates.length - 1];
        const dx = center[0] - last[0];
        const dy = center[1] - last[1];
        const radius = Math.sqrt(dx * dx + dy * dy);
        const rotation = Math.atan2(dy, dx);
        const newCoordinates = [];
        const numPoints = 12;
        for (let i = 0; i < numPoints; ++i) {
          const angle = rotation + (i * 2 * Math.PI) / numPoints;
          const fraction = i % 2 === 0 ? 1 : 0.5;
          const offsetX = radius * fraction * Math.cos(angle);
          const offsetY = radius * fraction * Math.sin(angle);
          newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
        }
        newCoordinates.push(newCoordinates[0].slice());
        if (!geometry) {
          geometry = new Polygon([newCoordinates]);
        } else {
          geometry.setCoordinates([newCoordinates]);
        }
        return geometry;
      };
    default:
      return null;
  }
};

export const addDrawInteraction = (map, type) => {
  if (!map || type === 'None') return;

  const source = map.getLayers().item(1).getSource();
  const geometryFunction = createGeometryFunction(type);
  const draw = new Draw({
    source,
    type: type === 'Square' || type === 'Box' || type === 'Star' ? 'Circle' : type,
    geometryFunction,
  });

  map.addInteraction(draw);
  return draw;
};
