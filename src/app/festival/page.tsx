'use client';
import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
  ApiService,
  FestivalGetManyDto,
  FestivalGetDto,
} from '../../services/api.service';
import Link from 'next/link';
import { Box, Button, Container, Stack } from '@mui/material';
import Map from '@/components/festivalPage/Map';
import { useRouter } from 'next/navigation';

export default function FestivalList() {
  const router = useRouter();
  const [festivalArray, setFestivalArray] = useState<FestivalGetDto[]>([]);
  const [error, setError] = useState(null);
  const [geoPosX, setGeoPosX] = useState(3.900041);
  const [geoPosY, setGeoPosY] = useState(43.6323496);
  const [loading, setLoading] = useState(true);
  const apiService: ApiService = new ApiService();
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const festivalListResult: FestivalGetDto[] =
        await apiService.festivalGetMany({
          offset: undefined,
          limit: 10,
          region: undefined,
          categoryId: undefined,
        } as FestivalGetManyDto);
      console.log(festivalListResult);
      setFestivalArray(festivalListResult);

      setLoading(false);
    } catch (e) {
      setError(error);
      setLoading(true);
    }
  };
  return (
    <>
    <Container  sx={{display: 'flex', maxHeight: '100vh'}}>
      <Stack >
        <Map />
      </Stack>
      <Stack direction={'column'} overflow={'scroll'} >
        {festivalArray?.map((festival, index: number) => {
          console.log(festival);
          const handleClickOnMap = (event: React.MouseEvent<HTMLDivElement>) => {
            setGeoPosX(festival.geoPosX);
            setGeoPosY(festival.geoPosY);
            setMarker(marker);
          };
        return (
            <Card
              key={index}
              sx={{
                cursor: 'pointer',
                marginTop: 2,
                minHeight: 250,
                marginLeft: 3,
                maxHeight: '100vh',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={handleClickOnMap}
            >
              <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                  Festival
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nom: {festival.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lieu: {festival.adress}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {festival.creationDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Site internet: {festival.website}
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
              <Link
                  href={'./../festival/detail?idFestival=' + festival.id}
                  style={{ textDecoration: 'none', margin: 'auto' }}
                >
                  Créer un évenement
                </Link>
            </Card>
        );
      })}
        </Stack>
      </Container>
    </>
  );
}
