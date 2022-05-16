import React, { useEffect, useState } from "react";
import MapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapPin from "../../images/mapPin.png";
import mapPinMorten from "../../images/mapPinMorten.png";
import mapPinUna from "../../images/mapPinUna.png";
import clusterPin from "../../images/clusterPin.png";
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
  const [clusterOpened, setClusterOpened] = useState({
    cluster: null as Array<GetBlogResponse>,
    location: { lat: 0, long: 0 },
  });
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

  const clusters: Array<Array<GetBlogResponse>> = [];
  const markersShown = [...markers];

  markersShown.sort((a, b) =>
    a.location.lat + a.location.long < b.location.lat + b.location.long ? 1 : -1
  );

  const zoomFactor = 1.5 / viewport.zoom;

  const pushMarkerInCluster = (marker: GetBlogResponse) => {
    clusters[clusters.length - 1].push(marker);
    if (markerOpened === marker) {
      setMarkerOpened(null);
    }
  };

  markersShown.map((marker, index) => {
    if (
      index > 0 &&
      Math.abs(marker.location.lat - markersShown[index - 1].location.lat) <
        zoomFactor &&
      Math.abs(marker.location.long - markersShown[index - 1].location.long) <
        zoomFactor
    ) {
      pushMarkerInCluster(marker);
    } else if (
      index < markersShown.length - 1 &&
      Math.abs(marker.location.lat - markersShown[index + 1].location.lat) <
        zoomFactor &&
      Math.abs(marker.location.long - markersShown[index + 1].location.long) <
        zoomFactor
    ) {
      clusters.push([]);
      pushMarkerInCluster(marker);
    }
  });

  if (clusters.length > 0) {
    for (let i = 0; i < markersShown.length; i++) {
      for (let j = 0; j < clusters.length; j++) {
        if (clusters[j].includes(markersShown[i])) {
          markersShown.splice(i, 1);
          i--;
        }
      }
    }
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
          if (UserIsAdmin && !clusterOpened.cluster) {
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
        {markersShown.map((marker, index) => {
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
                  <img
                    src={
                      marker.people === "Morten"
                        ? mapPinMorten
                        : marker.people === "Una"
                        ? mapPinUna
                        : mapPin
                    }
                    width="100%"
                  />
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
            <div className="w-40 bg-highlights border border-base">
              <div className="ml-1 mr-1">
                <div className="flex justify-center text-lg font-montserrat">
                  {markerOpened.title}
                </div>
                <div className="mt-2 font-montserrat">
                  {markerOpened.description}
                </div>
                <div className="flex justify-end mt-1 font-montserrat">
                  {markerOpened.date}
                </div>
              </div>
            </div>
          </Popup>
        )}
        {clusters.map((cluster, index) => {
          const locationAverage = { lat: 0, long: 0 };
          cluster.map((marker) => {
            locationAverage.lat += marker.location.lat;
            locationAverage.long += marker.location.long;
          });
          locationAverage.lat /= cluster.length;
          locationAverage.long /= cluster.length;

          return (
            <Marker
              key={index}
              latitude={locationAverage.lat}
              longitude={locationAverage.long}
              offset={[0, 0]}
            >
              <button
                onClick={() => {
                  setClusterOpened({
                    cluster: clusterOpened.cluster === cluster ? null : cluster,
                    location: locationAverage,
                  });
                }}
              >
                <div className="flex justify-center">
                  <img src={clusterPin} width="100%" />
                  <p className="absolute mt-3">{cluster.length}</p>
                </div>
              </button>
            </Marker>
          );
        })}
        {clusterOpened.cluster && (
          <Popup
            latitude={clusterOpened.location.lat}
            longitude={clusterOpened.location.long}
            closeButton={false}
            closeOnClick={false}
            offset={[0, -43]}
          >
            <div className="flex justify-end">
              <button
                className="ml-2"
                onClick={() => {
                  setClusterOpened({
                    cluster: null,
                    location: { lat: 0, long: 0 },
                  });
                }}
              >
                x
              </button>
            </div>
            <div className="flex justify-center w-48 max-h-60 overflow-auto">
              <div className="flex flex-col">
                {clusterOpened.cluster
                  .sort((a, b) => (a.id < b.id ? 1 : -1))
                  .map((marker, index) => {
                    return (
                      <Link key={index} to={`/blog/${marker.id}`}>
                        <button>
                          <div className="w-40 border border-base mb-2 bg-highlights">
                            <div className="ml-1 mr-1">
                              <div className="flex justify-center text-lg font-montserrat">
                                {marker.title}
                              </div>
                              <div className="flex justify-start mt-2 font-montserrat">
                                {marker.description}
                              </div>
                              <div className="flex justify-end font-montserrat mt-1">
                                {marker.date}
                              </div>
                            </div>
                          </div>
                        </button>
                      </Link>
                    );
                  })}
              </div>
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
