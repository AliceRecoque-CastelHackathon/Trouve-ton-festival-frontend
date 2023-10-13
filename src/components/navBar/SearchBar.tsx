import { Box, TextField } from '@mui/material';
import React from 'react';

export default function SearchBar() {
  return (
    <Box>
      <TextField
        id="filled-search"
        label="Search field"
        type="search"
        variant="filled"
        helperText="Rechercher un festival"
      />
    </Box>
  );
}
