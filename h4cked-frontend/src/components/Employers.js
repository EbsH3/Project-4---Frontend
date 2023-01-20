import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { Container, Grid } from '@mui/material';
import EmployerCard from './common/EmployerCard';

export default function Employers() {
  const [employers, setEmployers] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.employers)
      .then(({ data }) => {
        setEmployers(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  return (
    <>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          {employers?.map((employer) => (
            <Grid item xs={4} key={employer._id}>
              <EmployerCard
                name={employer.employer}
                location={employer.location}
                image={employer.logo}
                sector={employer.sector}
              ></EmployerCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
// const Employers = () => {
//   return (
//     <div className='home'>
//       <h1>Employers</h1>
//     </div>
//   );
// };
