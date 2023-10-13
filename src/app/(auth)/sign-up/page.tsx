'use client';
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import TextLinkComponent from '@/components/text/text-link';
import { TextLinkHrefEnum } from '@/utils/enums/text-link-href';
import { Container, Typography } from '@mui/material';

export default function Signup() {
  return (
    <Container sx={{paddingTop: 5}}>
      <Typography variant="h4" align="center" gutterBottom>
        Inscription
      </Typography>
      <AuthForm formContext={TextLinkHrefEnum.register} />
      <TextLinkComponent
        href={TextLinkHrefEnum.login}
        text="Déjà un compte ? Connectez-vous !"
      />
    </Container>
  );
}
