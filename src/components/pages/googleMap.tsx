import React, { useEffect, useState } from "react";
import MapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapPin from "../../images/mapPin.png";
import { Link } from "react-router-dom";
import { GetBlogs } from "../../rest/blog";
import { GetBlogResponse } from "../../entities/blog";
import { UserIsAdmin } from "./login";

export let PointClicked = { latitude: 0, longitude: 0 };

interface googleMapProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

export function GoogleMap(props: googleMapProps) {
  const [viewport, setViewport] = useState({
    latitude: props.latitude,
    longitude: props.longitude,
    width: "100vw",
    height: "100vw",
    zoom: props.zoom,
  });
  const [markerOpened, setMarkerOpened] = useState(null as GetBlogResponse);
  const [markers, setMarkers] = useState([] as Array<GetBlogResponse>);
  const [pointClicked, setPointClicked] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const getData = async () => {
      const markers = await GetBlogs();
      setMarkers(markers);
    };
    getData();
  }, []);

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
        onClick={(event) => {
          if (UserIsAdmin) {
            setPointClicked({
              latitude: event.lngLat.lat,
              longitude: event.lngLat.lng,
            });
            PointClicked = {
              latitude: event.lngLat.lat,
              longitude: event.lngLat.lng,
            };
          }
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
        {pointClicked.latitude && pointClicked.longitude && (
          <Marker
            latitude={pointClicked.latitude}
            longitude={pointClicked.longitude}
            offset={[0, -20]}
          >
            <img src={mapPin} width="100%" />
            <Popup
              latitude={pointClicked.latitude}
              longitude={pointClicked.longitude}
              closeButton={false}
              closeOnClick={false}
              offset={[0, -43]}
            >
              <div className="flex">
                <div>
                  <Link to={`/blog/0`} className="w-1/2">
                    <button className="px-2 border border-base bg-highlights hover:bg-details-light w-full h-10 rounded-xl font-montserrat">
                      Create new Blog here
                    </button>
                  </Link>
                </div>
                <div>
                  <button
                    className="ml-2"
                    onClick={() => {
                      setPointClicked({
                        latitude: 0,
                        longitude: 0,
                      });
                      PointClicked = {
                        latitude: 0,
                        longitude: 0,
                      };
                    }}
                  >
                    x
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapGL>
    </div>
  );
}
