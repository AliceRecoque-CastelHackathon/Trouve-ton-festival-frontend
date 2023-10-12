import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import React, { useMemo, useState } from 'react';

export default function Map() {
  const libraries = useMemo(() => ['places'], []);
  const [geoPosX, setGeoPosX] = useState(3.900041);
  const [geoPosY, setGeoPosY] = useState(43.6323496);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
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
      >
        {/* <MarkerF
              position={{ lat: geoPosY, lng: geoPosX }}
              icon={{
                url: '/images/marker.png',
                scaledSize: new google.maps.Size(50, 50),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(25, 25),
              }}
            /> */}
      </GoogleMap>
    );
}
