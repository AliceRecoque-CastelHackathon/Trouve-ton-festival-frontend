'use client';
// import FestivalDetails from '../../../mockupData.json'
import * as React from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Image, { ImageLoader } from 'next/image';
import { useUserContext } from '@/utils/contexts/UserContext';
import { Container, Stack } from '@mui/material';
import { ApiService, FestivalGetDto } from '@/services/api.service';
import { useState, useEffect } from 'react';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export default function Festival() {
  const { userDataLoggedIn } = useUserContext();
  const router = useRouter();
  const [festival, setFestival] = useState<FestivalGetDto>();
  const apiService: ApiService = new ApiService();

  const params = useSearchParams();

  useEffect(() => {
    const id = params.get('idFestival');
    console.log(id);
    if (id) {
      FetchFestivalById(parseInt(id));
    }
  }, []);

  const FetchFestivalById = async (id: number) => {
    try {
      const result = await apiService.festivalById(id);
      console.log(result);

      setFestival(result);
    } catch (e) {}
  };

  const imageLoader: ImageLoader = ({ src }) => {
    return `http://localhost:3003/${src}`;
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: 400,
          alignItems: 'center',
          borderRadius: 2,
        }}
      >
        <CardMedia title="Festival">
          {/* <Image
            loader={imageLoader}
            src={userDataLoggedIn?.avatarUrl ?? 'images/default_user.png'}
            alt="Festival profile Image"
            width={200}
            height={200}
          /> */}
        </CardMedia>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h5" component="div">
            Festival
          </Typography>
          <div>
            <Typography variant="body2" color="text.secondary">
              Nom :{festival?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lieux :{festival?.adress + festival?.zipcode}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Site Web :{festival?.website}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email :{festival?.email}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Date :
              {/* {festival?.periode_principale_de_deroulement_du_festival} */}
            {/* </Typography>  */}
          </div>
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2}>
            <Link href={'/festival/update'} style={{ textDecoration: 'none' }}>
              Modifier
            </Link>
            <Link href={'/festival'} style={{ textDecoration: 'none' }}>
              Annuler
            </Link>
          </Stack>
        </CardActions>
      </Card>
    </Container>
  );
}
