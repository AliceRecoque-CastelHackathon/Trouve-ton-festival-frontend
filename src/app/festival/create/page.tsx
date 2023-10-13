'use client';
import { ApiService, FestivalCreateDto } from '@/services/api.service';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function CreateFestival() {
  const apiService: ApiService = new ApiService();
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [zipcode, setZipcode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [creationDate, setCreationDate] = useState<string>('');
  const [geoPosX, setGeoPosX] = useState<number>(0);
  const [geoPosY, setGeoPosY] = useState<number>(0);
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const [festivalData, setFestivalData] = useState<FestivalCreateDto>();

  // const handleSubmitForm = async () => {
  //   const createdFestival: FestivalCreateDto = new FestivalCreateDto({
  //     name: name,
  //     region: region,
  //     department: department,
  //     zipcode: zipcode,
  //     address: address,
  //     website: website,
  //     email: email,
  //     creationDate: creationDate,
  //     geoPosX: geoPosX,
  //     geoPosY: geoPosY,
  //     dateStart: dateStart,
  //     dateEnd: dateEnd,
  //   });
  //   const createdFestivalData: FestivalCreateDto =
  //     await apiService.festivalCreatePost(createdFestival);
  //   setFestivalData(createdFestivalData);
  // };
  return <></>;
}
