'use client';
import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import { ApiService, festivalGetDto } from '../../services/api.service';
import Link from 'next/link';
import festivals from '../../mockupData.json';
import Image, { ImageLoader } from 'next/image';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { Stack } from '@mui/material';

export default function FestivalList() {
  const libraries = useMemo(() => ['places'], []);
  const [geoPosX, setGeoPosX] = useState(3.900041);
  const [geoPosY, setGeoPosY] = useState(43.6323496);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });
  const mapCenter = useState({ lat: geoPosY, lng: geoPosX });

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    [],
  );
  const imageLoader: ImageLoader = ({ src }) => {
    return `http://localhost:3003/${src}`;
  };

  //   const [festivalArray, setFestivalArray] = useState<FestivalGetDto[]>([]);
  //   const [error, setError] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const apiService: ApiService = new ApiService();

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const fetchData = async () => {
  //     try {
  //       //   setFestvalArray(await apiService.festivalAll());
  //       setLoading(false);
  //     } catch (e) {
  //       setError(error);
  //       setLoading(true);
  //     }
  //   };
  if (!isLoaded) return <div>Chargement...</div>;
  else
    return (
      <>
        <GoogleMap
          options={mapOptions}
          zoom={14}
          center={{ lng: geoPosX, lat: geoPosY }}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: '800px', height: '800px' }}
          onLoad={() => console.log('Map Component Loaded...')}
        ></GoogleMap>
        {festivals.results?.map((festival, index: number) => {
          const handleClickOnMap = (
            event: React.MouseEvent<HTMLDivElement>,
          ) => {
            setGeoPosX(festival.geocodage_xy.lon);
            setGeoPosY(festival.geocodage_xy.lat);
          };
          return (
            <Stack direction={'row-reverse'}>
              <Card
                key={index}
                sx={{
                  cursor: 'pointer',
                  marginTop: 2,
                  marginLeft: 2,
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={handleClickOnMap}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Festival
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Nom: {festival.nom_du_festival}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lieu: {festival.adresse_postale}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Organisateur : {festival.libelle_epci_collage_en_valeur}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link
                    href={'./../festival/' + festival.id}
                    style={{ textDecoration: 'none', margin: 'auto' }}
                  >
                    Details
                  </Link>
                </CardActions>
              </Card>
            </Stack>
          );
        })}
      </>
    );
}
