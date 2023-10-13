'use client';
import {
  ApiService,
  FestivalGetDto,
  FestivalNameDto,
} from '@/services/api.service';
import { TextLinkHrefEnum } from '@/utils/enums/text-link-href';
import { Search } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const [festivalName, setFestivalName] = React.useState<string>('');
  const apiService: ApiService = new ApiService();

  const handleSubmitSearch = async () => {
    if (festivalName) {
      const foundFestival: FestivalGetDto = await apiService.festivalByName({
        name: festivalName,
      } as FestivalNameDto);
      setFestivalName("");
      router.push(`${TextLinkHrefEnum.festival}?idFestival=${foundFestival.id}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <TextField
        id="input-with-icon-textfield"
        size="small"
        value={festivalName}
        sx={{backgroundColor: 'white'}}
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
