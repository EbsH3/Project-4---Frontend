import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { Container, Grid } from '@mui/material';
import SectorCard from './common/SectorCard';

export default function Sectors() {
  const [sectors, setSectors] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.sectors)
      .then(({ data }) => {
        setSectors(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2}>
        {sectors?.map((sector) => (
          <Grid item xs={4} key={sector._id}>
            <SectorCard name={sector.name} id={sector._id}></SectorCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
