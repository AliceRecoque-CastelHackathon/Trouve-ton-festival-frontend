'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import { ApiService, festivalGetDto } from '../../services/api.service';
import Link from 'next/link';
import festivals from '../../mockupData.json';
import Image, { ImageLoader } from 'next/image';

export default function FestivalList() {
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
  const imageLoader: ImageLoader = ({ src }) => {
    return `http://localhost:3003/${src}`;
  };
  return (
    <>
      {festivals.results?.map((festival, index: number) => {
        return (
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
            </CardContent>
            <CardActions>
              <Link
                href={'./../festivalDetails/' + festival.id}
                style={{ textDecoration: 'none', margin: 'auto' }}
              >
                Details
              </Link>
            </CardActions>
          </Card>
        );
      })}
      ;
    </>
  );
}
