import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { Container, Grid } from '@mui/material';
import VacancyCard from './common/VacancyCard';

export default function Vacancies() {
  const [vacancies, setVacancies] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.vacancies)
      .then(({ data }) => {
        setVacancies(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2}>
        {vacancies?.map((vacancy) => (
          <Grid item xs={4} key={vacancy._id}>
            <VacancyCard
              title={vacancy.title}
              location={vacancy.location}
              url={vacancy.url}
              employer={vacancy.employer}
              id={vacancy.id}
            ></VacancyCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// const Vacancies = () => {
//   return (
//     <div className='home'>
//       <h1>Vacancies</h1>
//     </div>
//   );
// };

// export default Vacancies;
