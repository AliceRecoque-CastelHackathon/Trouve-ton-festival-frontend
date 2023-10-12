'use client';
import FestivalDetails from '../../../mockupData.json'
import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Image, { ImageLoader } from 'next/image';
import { useUserContext } from '@/utils/contexts/UserContext';
import { Container, Stack } from '@mui/material';


export default function Festival() {
  const { userDataLoggedIn } = useUserContext();
  const [festival, setFestival] = FestivalDetails.results
  console.log(festival)
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
          <Image
            loader={imageLoader}
            src={userDataLoggedIn?.avatarUrl ?? 'images/default_user.png'}
            alt="Festival profile Image"
            width={200}
            height={200}
          />
        </CardMedia>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h5" component="div">
            Festival
          </Typography>
          <div>
            <Typography variant="body2" color="text.secondary">
              Nom : 
              {festival?.nom_du_festival}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lieux : 
              {festival?.adresse_postale} {festival.code_insee_commune} 
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Site Web : 
              {festival?.site_internet_du_festival}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email : 
                {festival?.adresse_e_mail}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Categorie : 
                {festival?.discipline_dominante}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Organisateur : 
                {festival?.libelle_epci_collage_en_valeur}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date : 
                {festival?.periode_principale_de_deroulement_du_festival}
            </Typography>
            

          </div>
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2}>
            <Link href={'/festivalDetail/update'} style={{ textDecoration: 'none' }}>
              Modifier
            </Link>
            <Link href={'/'} style={{ textDecoration: 'none' }}>
              Annuler
            </Link>
          </Stack>
        </CardActions>
      </Card>
    </Container>
  );
}
