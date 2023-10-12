'use client';

import React, { useState } from 'react';
import {
  ApiService,
  UserGetDto,
  UserUpdateDto,
} from '../../services/api.service';
import { useRouter } from 'next/navigation';

import {
  TextField,
  Button,
  Container,
  Link,
  ButtonGroup,
  Stack,
} from '@mui/material';
import ToolBoxService from '@/services/toolbox.service';
import { useUserContext } from '@/utils/contexts/UserContext';

export default function UserUpdateForm() {
  const apiService: ApiService = new ApiService();
  const router = useRouter();
  const [lastname, setLastname]= useState<string>("");
  const [FestivalName, setFestivalName] = useState<string>('');
  const [FestivalAdress, setFestivalAdress] = useState<string>('');
  const [FestivalWeb, setFestivalWeb] = useState<string>('');
  const [FestivalEmail, setFestivalEmail] = useState<string>('');
  const [FestivalCategorie, setFestivalCategorie] = useState<string>('');
  const [FestivalOrganisateur, setFestivalOrganisateur] = useState<string>('');
  const [FestivalDate, setFestivalDate] = useState<string>('')
  const [firstname, setFirstname] = useState<string>('');
  const { userDataLoggedIn, setUserDataLoggedIn } = useUserContext();

  async function handleSubmitForm() {
    //send Data over server
    const updatedUser: UserUpdateDto = new UserUpdateDto({
      id: userDataLoggedIn!.id,
      email: userDataLoggedIn!.email,
      lastname: !ToolBoxService.stringIsNullOrWhiteSpace(lastname)
        ? lastname
        : userDataLoggedIn?.lastname,
      firstname: !ToolBoxService.stringIsNullOrWhiteSpace(firstname)
        ? firstname
        : userDataLoggedIn?.firstname,
    });
    
    const updatedFestivalData: UserGetDto =
      await apiService.userUpdate(updatedUser);
    setUserDataLoggedIn(updatedFestivalData);
    setLastname('');
    setFirstname('');
    setFestivalName('');
    setFestivalAdress('');
    setFestivalWeb('');
    setFestivalEmail('');
    setFestivalCategorie('');
    setFestivalOrganisateur('');
    setFestivalDate('');
  }

  return (
    <Container maxWidth="xs">
      <TextField
        label="Nom du festival"
        type="text"
        value={FestivalName}
        onChange={(e) => setFestivalName(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Adress du festival :"
        type="text"
        value={FestivalAdress}
        onChange={(e) => setFestivalAdress(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Site we du festival :"
        type="text"
        value={FestivalWeb}
        onChange={(e) => setFestivalWeb(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Email :"
        type="text"
        value={FestivalEmail}
        onChange={(e) => setFestivalEmail(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Categorie :"
        type="text"
        value={FestivalCategorie}
        onChange={(e) => setFestivalCategorie(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Organisateur :"
        type="text"
        value={FestivalOrganisateur}
        onChange={(e) => setFestivalOrganisateur(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Date :"
        type="text"
        value={FestivalDate}
        onChange={(e) => setFestivalDate(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={5}
      >
        <Button
          variant="outlined"
          color="error"
          fullWidth
          size="medium"
          onClick={() => {
            router.back();
          }}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="medium"
          color="primary"
          onClick={handleSubmitForm}
        >
          Validez
        </Button>
      </Stack>
    </Container>
  );
}
