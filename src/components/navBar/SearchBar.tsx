'use client';
import {
  ApiService,
  FestivalGetDto,
  FestivalNameDto,
} from '@/services/api.service';
import { Search } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useEffect } from 'react';

export default function SearchBar() {
  const [festivalName, setFestivalName] = React.useState<string>('');
  const apiService: ApiService = new ApiService();

  const handleSubmitSearch = async () => {
    if (festivalName) {
      const foundFestival: FestivalGetDto = await apiService.festivalByName({
        name: festivalName,
      } as FestivalNameDto);
      console.log(foundFestival);
    }
  };

  return (
    <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
      <TextField
        id="input-with-icon-textfield"
        size="small"
        sx={{ alignItems: 'center', justifyContent: 'center' }}
        variant="standard"
        onChange={(e) => {
          setFestivalName(e.target.value);
        }}
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
