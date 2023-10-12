'use client';
import * as React from 'react';
import FestivalDetails from './../../../mockupData.json'
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import UploadFileComponent from '@/components/file/UploadFile';
import FestivalUpdateForm from '@/components/festival/festivalUpdateForm';
import Image, { ImageLoader } from 'next/image';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { UploadTypesEnum } from '@/utils/enums/upload-type';
import { ImageFileExtensionEnum } from '@/utils/enums/file-extension';
import { useUserContext } from '@/utils/contexts/UserContext';

console.log(FestivalDetails.results);

export default function FestivalUpdate() {
  const [isFileUploadVisible, setIsFileUploadVisible] =
    useState<boolean>(false);

  const { userDataLoggedIn } = useUserContext();

  const imageLoader: ImageLoader = ({ src }) => {
    return `http://localhost:3003/${src}`;
  };

  const handleCloseModal = () => {
    setIsFileUploadVisible(false);
  };

  return (
    <>
      <Card
        sx={{ maxWidth: 645, marginTop: 15, margin: 'auto', borderRadius: 2 }}
      >
        <CardMedia
          sx={{ width: '70%', margin: 'auto', position: 'relative' }}
          title="Festival"
        >
          <Image
            className="imageFormCard"
            loader={imageLoader}
            src={userDataLoggedIn?.avatarUrl ?? 'images/default_user.png'}
            alt="user profile image"
            width={440}
            height={440}
          />
          <IconButton
            aria-label="edit festival"
            size="large"
            sx={{
              position: 'absolute',
              right: 25,
              bottom: 15,
              zIndex: 1000,
              backgroundColor: 'black',
              color: 'white',
            }}
            onClick={() => {
              setIsFileUploadVisible(!isFileUploadVisible);
            }}
          >
            <EditIcon />
          </IconButton>
        </CardMedia>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h3" component="div">
            Festival :
            {/* {userDataLoggedIn?.firstname + ' ' + userDataLoggedIn?.lastname} */}
          </Typography>
          <Typography component="div">
            Veuillez renseigner les champs que vous voulez modifier
          </Typography>
        </CardContent>
        <CardActions>
          <FestivalUpdateForm />
        </CardActions>
      </Card>
      {isFileUploadVisible ? (
        <UploadFileComponent
          title={'Modifier mon festival'}
          contentText={
            'Veuillez selectionner un fichier pour modifier votre image de festival'
          }
          handleOnClose={handleCloseModal}
          uploadType={UploadTypesEnum.userAvatar}
          acceptedFileExtension={[
            ImageFileExtensionEnum.jpg,
            ImageFileExtensionEnum.png,
          ]}
        />
      ) : (
        <></>
      )}
    </>
  );
}
