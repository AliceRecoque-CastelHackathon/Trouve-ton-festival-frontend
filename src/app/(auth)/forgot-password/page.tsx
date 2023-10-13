'use client';
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import TextLinkComponent from '@/components/text/text-link';
import { TextLinkHrefEnum } from '@/utils/enums/text-link-href';
import { Container, Typography } from '@mui/material';

export default function forgotPassword() {
  return (
    <Container sx={{paddingTop: 5}}>
      <Typography variant="h4" align="center" gutterBottom>
        Mot de passe oublié
      </Typography>
      <AuthForm formContext={TextLinkHrefEnum.forgotPwd} />
      <TextLinkComponent
        href={TextLinkHrefEnum.login}
        text="Retour à la page de connexion"
      />
    </Container>
  );
}
