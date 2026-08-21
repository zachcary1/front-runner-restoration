import { useEffect, useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { geoMercator } from 'd3-geo';
import { feature } from 'topojson-client';
import { FLORIDA_LOCATIONS } from '../../data/services.js';

const FLORIDA_TOPOJSON_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
const FLORIDA_FIPS = '12';

const CITY_COORDINATES = {
  'Palm Beach Gardens': [-80.1300, 26.8234],
  'Vero Beach': [-80.4076, 27.6386],
  Miami: [-80.1918, 25.7617],
  Naples: [-81.7948, 26.1420],
  Jacksonville: [-81.6557, 30.3322],
  Orlando: [-81.3792, 28.5383],
  'Port St. Lucie': [-80.3582, 27.2730],
  'Cape Coral': [-81.9495, 26.5629],
  'St. Petersburg': [-82.6403, 27.7676],
  Tallahassee: [-84.2807, 30.4383],
  'Daytona Beach': [-81.0228, 29.2108],
  Pensacola: [-87.2169, 30.4213],
};

const CITIES = FLORIDA_LOCATIONS.map((city) => ({ city, coordinates: CITY_COORDINATES[city] }));

const MAP_WIDTH = 260;
const MAP_HEIGHT = 300;
const MAP_PADDING = 6;

const GEOGRAPHY_STYLE = {
  fill: 'none',
  stroke: 'var(--accent-gold)',
  strokeWidth: 1.5,
  outline: 'none',
};

export default function FloridaMap() {
  const [floridaFeature, setFloridaFeature] = useState(null);
  const [activeCity, setActiveCity] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch(FLORIDA_TOPOJSON_URL)
      .then((res) => res.json())
      .then((topology) => {
        if (cancelled) return;
        const { features } = feature(topology, topology.objects.states);
        const florida = features.find((f) => String(f.id) === FLORIDA_FIPS);
        setFloridaFeature(florida || null);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const projection = useMemo(() => {
    if (!floridaFeature) return null;
    return geoMercator().fitExtent(
      [
        [MAP_PADDING, MAP_PADDING],
        [MAP_WIDTH - MAP_PADDING, MAP_HEIGHT - MAP_PADDING],
      ],
      floridaFeature
    );
  }, [floridaFeature]);

  // A tap on touch devices synthesizes both a mouseenter and a click, which
  // would cancel a hover-set + click-toggled state right back out on the
  // first tap. Use hover on devices that actually support it, and fall back
  // to a plain click toggle everywhere else (touch), never both at once.
  const supportsHover = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    []
  );

  if (!floridaFeature || !projection) {
    return <div className="florida-map__stage florida-map__stage--loading" aria-hidden="true" />;
  }

  const geography = { type: 'FeatureCollection', features: [floridaFeature] };
  const active = CITIES.find((c) => c.city === activeCity);
  const activePoint = active ? projection(active.coordinates) : null;

  const toggleCity = (city) => setActiveCity((c) => (c === city ? null : city));
  const showCity = (city) => setActiveCity(city);
  const hideCity = (city) => setActiveCity((c) => (c === city ? null : c));

  return (
    <div className="florida-map__stage">
      <ComposableMap
        projection={projection}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        role="img"
        aria-label="Map of Florida with recent project locations"
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={geography}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{ default: GEOGRAPHY_STYLE, hover: GEOGRAPHY_STYLE, pressed: GEOGRAPHY_STYLE }}
              />
            ))
          }
        </Geographies>

        {CITIES.map(({ city, coordinates }, i) => (
          <Marker
            key={city}
            coordinates={coordinates}
            className="florida-map__marker"
            role="button"
            tabIndex={0}
            aria-label={city}
            onMouseEnter={supportsHover ? () => showCity(city) : undefined}
            onMouseLeave={supportsHover ? () => hideCity(city) : undefined}
            onFocus={supportsHover ? () => showCity(city) : undefined}
            onBlur={supportsHover ? () => hideCity(city) : undefined}
            onClick={!supportsHover ? () => toggleCity(city) : undefined}
          >
            <circle r={4} className="florida-map__pulse" style={{ animationDelay: `${(i % 6) * 0.35}s` }} />
            <circle r={4} className="florida-map__dot" />
          </Marker>
        ))}
      </ComposableMap>

      {active && activePoint && (
        <div
          className="florida-map__tooltip"
          style={{
            left: `${(activePoint[0] / MAP_WIDTH) * 100}%`,
            top: `${(activePoint[1] / MAP_HEIGHT) * 100}%`,
          }}
        >
          {active.city}
        </div>
      )}
    </div>
  );
}
