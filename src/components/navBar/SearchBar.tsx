'use client';
import { Search } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useEffect } from 'react';

export default function SearchBar() {
    const apiService: ApiService = new ApiService();
    useEffect(() => {
    }, [])
    const FetchFestival  = async (id: number) => {
    const handleSubmitSearch = () => {
      
  };
  return (
    <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
      <TextField
        id="input-with-icon-textfield"
        size="small"
        sx={{ alignItems: 'center', justifyContent: 'center' }}
        variant="standard"
      />
      <IconButton
        type="submit"
        aria-label="search"
        onClick={handleSubmitSearch}
      >
        <Search />
      </IconButton>
    </Box>
  );
}
