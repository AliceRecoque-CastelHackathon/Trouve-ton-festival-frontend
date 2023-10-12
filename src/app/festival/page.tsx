'use client';
import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
  ApiService,
  FestivalGetAnyDto,
  FestivalGetDto,
} from '../../services/api.service';
import Link from 'next/link';
import {
  GoogleMap,
  Marker,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import { Stack } from '@mui/material';
import Map from '@/components/festivalPage/Map';

export default function FestivalList() {
  const [festivalArray, setFestivalArray] = useState<FestivalGetDto[]>([]);
  const [error, setError] = useState(null);
  const [geoPosX, setGeoPosX] = useState(3.900041);
  const [geoPosY, setGeoPosY] = useState(43.6323496);
  const [loading, setLoading] = useState(true);
  const apiService: ApiService = new ApiService();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const festivalListResult: FestivalGetDto[] =
        await apiService.festivalGetMany({
          offset: undefined,
          limit: 100,
          region: undefined,
          categoryId: undefined,
        } as FestivalGetAnyDto);
      setFestivalArray(festivalListResult);
      setLoading(false);
    } catch (e) {
      setError(error);
      setLoading(true);
    }
  };
  return (
    <>
      <Map />
      {festivalArray?.map((festival, index: number) => {
        console.log(festival);
        const handleClickOnMap = (event: React.MouseEvent<HTMLDivElement>) => {
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
                  style={{ textDecoration: 'none', margin: 'auto' }}
                >
                  Details
                </Link>
              </CardActions>
            </Card>
          </Stack>
          <Card
            key={index}
            sx={{
              marginTop: 2,
              marginLeft: 2,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
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
                href={'./../festival/detail?idFestival=' + festival.id}
                style={{ textDecoration: 'none', margin: 'auto' }}
              >
                Details
              </Link>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}
