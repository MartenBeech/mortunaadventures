import React, { useEffect, useState } from "react";
import MapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapPin from "../../images/mapPin.png";
import { Link } from "react-router-dom";
import { GetBlogs } from "../../rest/blog";
import { GetBlogResponse } from "../../entities/blog";

interface viewportProps {
  viewState: {
    bearing: number;
    latitude: number;
    longitude: number;
    padding: { top: number; bottom: number; left: number; right: number };
    pitch: number;
    zoom: number;
  };
}

export function GoogleMap() {
  const [viewport, setViewport] = useState({
    latitude: 49.525963,
    longitude: 15.255119,
    width: "100vw",
    height: "100vw",
    zoom: 4,
  });
  const [markerOpened, setMarkerOpened] = useState(null as GetBlogResponse);
  const [markers, setMarkers] = useState([] as Array<GetBlogResponse>);

  useEffect(() => {
    const getData = async () => {
      const markers = await GetBlogs();
      setMarkers(markers);
    };
    getData();
  }, []);

  function changeViewpoint(newViewport: viewportProps) {
    setViewport({
      latitude: newViewport.viewState.latitude,
      longitude: newViewport.viewState.longitude,
      width: viewport.width,
      height: viewport.height,
      zoom: newViewport.viewState.zoom,
    });
  }

  return (
    <div className="h-screen">
      <MapGL
        {...viewport}
        mapStyle={process.env.REACT_APP_MAP_STYLE}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onZoom={(newViewport: viewportProps) => {
          changeViewpoint(newViewport);
        }}
        onDrag={(newViewport: viewportProps) => {
          changeViewpoint(newViewport);
        }}
      >
        {markers.map((marker, index: number) => {
          return (
            <Marker
              key={index}
              latitude={marker.location.lat}
              longitude={marker.location.long}
              offset={[0, -20]}
            >
              <Link to={`/blog/${marker.id}`}>
                <button
                  onMouseEnter={() => {
                    setMarkerOpened(marker);
                  }}
                  onMouseLeave={() => {
                    setMarkerOpened(null);
                  }}
                >
                  <img src={mapPin} width="100%" />
                </button>
              </Link>
            </Marker>
          );
        })}
        {markerOpened && (
          <Popup
            latitude={markerOpened.location.lat}
            longitude={markerOpened.location.long}
            closeButton={false}
            closeOnClick={false}
            offset={[0, -43]}
          >
            <div>
              <div className="text-lg font-montserrat">
                {markerOpened.title}
              </div>
              <div className="font-montserrat">{markerOpened.date}</div>
            </div>
          </Popup>
        )}
      </MapGL>
    </div>
  );
}
