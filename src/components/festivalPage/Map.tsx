import { FestivalGetDto } from '@/services/api.service';
import { TextLinkHrefEnum } from '@/utils/enums/text-link-href';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

interface IMapProps {
  festivalArray: FestivalGetDto[];
}

export default function Map(props: IMapProps) {
  const router = useRouter();
  const [geoPosX, setGeoPosX] = useState(3.900041);
  const [geoPosY, setGeoPosY] = useState(43.6323496);
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
    }
  }, []);

  useEffect(() => {
    if (isLoaded && map) {
      let markers: google.maps.Marker[] = [];
      props.festivalArray.forEach((festival: FestivalGetDto) => {
        const infowindow = new google.maps.InfoWindow({
          content: festival.name,
          ariaLabel: "Uluru",
        });
        const newMarker = new google.maps.Marker({
          position: { lat: festival.geoPosY, lng: festival.geoPosX},
          map: map,
          title: festival.name,
        });

        newMarker.addListener('click', () => {
          infowindow.open({
            anchor: newMarker,
            map: map,
          });
        });

        markers.push(newMarker);
      });
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
        zoom={8}
        center={{ lng: geoPosX, lat: geoPosY }}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '600px', height: '90vh' }}
        onLoad={(map) => setMap(map)}
      ></GoogleMap>
    );
}
