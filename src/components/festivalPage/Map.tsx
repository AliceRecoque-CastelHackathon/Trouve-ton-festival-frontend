import { FestivalGetDto } from '@/services/api.service';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import React, { useEffect, useMemo, useState } from 'react';

interface IMapProps {
  festivalArray: FestivalGetDto[];
}

export default function Map(props: IMapProps) {
  const [geoPosX, setGeoPosX] = useState(0);
  const [geoPosY, setGeoPosY] = useState(0);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const libraries = useMemo(() => ['places'], []);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoPosX(position.coords.longitude);
        setGeoPosY(position.coords.latitude);
      });
    } else {
      setGeoPosX(3.900041);
      setGeoPosY(43.6323496);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && map) {
      let markers: google.maps.Marker[] = [];
      props.festivalArray.forEach((festival: FestivalGetDto) => {
        const newMarker = new google.maps.Marker({
          position: { lat: festival.geoPosY, lng: festival.geoPosX},
          map: map,
          title: festival.name
        });
        markers.push(newMarker);
      });
      console.log(markers)
      setMarkers(markers);
    }
  }, [props.festivalArray, isLoaded, map]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
      zoomControl: true,
    }),
    [],
  );

  if (isLoaded)
    return (
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={{ lng: geoPosX, lat: geoPosY }}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '800px', height: '800px' }}
        onLoad={(map) => setMap(map)}
      ></GoogleMap>
    );
}
