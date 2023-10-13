import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import React, { useEffect, useMemo, useState } from 'react';

export default function Map() {
  const [geoPosX, setGeoPosX] = useState(0);
  const [geoPosY, setGeoPosY] = useState(0);
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
  const libraries = useMemo(() => ['places'], []);
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

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
        onLoad={() => console.log('Map Component Loaded...')}
      ></GoogleMap>
    );
}
