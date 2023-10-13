'use client';
import React from 'react';
import { useUserContext } from '@/utils/contexts/UserContext';
import { AppBar, Button, Container, IconButton, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TextLinkHrefEnum } from '@/utils/enums/text-link-href';
import { useRouter } from 'next/navigation';
import { Search } from '@mui/icons-material';
import SearchBar from './SearchBar';

const NavBar = () => {
  const { userDataLoggedIn, setUserDataLoggedIn } = useUserContext();
  const router = useRouter();

  return userDataLoggedIn ? (
    <>
      <AppBar
        sx={{
          height: '40px',
          display: 'flex',
          alignItems: 'space-evenly',
          justifyContent: 'center',
        }}
        color="primary"
      >
        <Stack justifyContent={'space-between'} direction={'row'}>
          <IconButton onClick={() => router.push(TextLinkHrefEnum.home)}>
            <HomeIcon />
          </IconButton>
          <SearchBar />
          <Button
            color="inherit"
            onClick={() => {
              router.push(TextLinkHrefEnum.profileList);
            }}
          >
            Liste des profils
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              router.push(TextLinkHrefEnum.festivalList);
            }}
          >
            Liste des festivals
          </Button>
          <Stack direction={'row'}>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem('access_token');
                setUserDataLoggedIn(undefined);
                router.push(TextLinkHrefEnum.home);
              }}
            >
              Logout
            </Button>
            <IconButton
              color="inherit"
              onClick={() => {
                router.push(TextLinkHrefEnum.profile);
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Stack>
        </Stack>
      </AppBar>
    </>
  ) : (
    <>
      <AppBar color="primary">
        <Stack justifyContent={'space-between'} direction={'row'}>
          <IconButton onClick={() => router.push(TextLinkHrefEnum.home)}>
            <HomeIcon />
          </IconButton>
          <Button
            color="inherit"
            onClick={() => {
              router.push(TextLinkHrefEnum.festivalList);
            }}
          >
            Liste des festivals
          </Button>

          <Button
            color="inherit"
            onClick={() => {
              router.push(TextLinkHrefEnum.login);
            }}
          >
            Login
          </Button>
        </Stack>
      </AppBar>
    </>
  );
};

export default NavBar;
