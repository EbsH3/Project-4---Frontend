import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { Container, Grid, IconButton } from '@mui/material';
import VacancyCard from './common/VacancyCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CardActions from '@mui/material/CardActions';
import SearchVacancies from './common/SearchVacancies';

export default function Vacancies() {
  const [vacancies, setVacancies] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  // const [searchQuery, setSearchQuery] = useState('');

  // const filterVacancies = () => {
  //   const regex = new RegExp(searchQuery, 'i');
  //   const filteredVacancies = vacancies.filter((vacancy) => {
  //     return vacancy.vacancy.match(regex);
  //   });
  //   return filteredVacancies;
  // };

  const filterVacancies = () => {
    const regex = new RegExp(searchQuery, 'i');
    const filteredVacancies = vacancies.filter((vacancy) => {
      return vacancy.title.match(regex);
    });
    return filteredVacancies;
  };

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
    <section className='jobSearch'>
      <SearchVacancies
        className='searchVacancy'
        value={searchQuery}
        handleChange={setSearchQuery}
      />
      <h1 className='vacanciesHeading'>All The Latest Live Roles</h1>

      <Container className='vacancies' maxWidth='lg'>
        <Grid container spacing={1.5}>
          {vacancies &&
            filterVacancies().map((vacancy) => (
              <Grid
                className='vacancyCard'
                item
                xs={3}
                marginLeft={3}
                key={vacancy.id}
              >
                <VacancyCard
                  title={vacancy.title}
                  location={vacancy.location}
                  url={vacancy.url}
                  employer={vacancy.employer}
                  id={vacancy.id}
                  salary={vacancy.salary}
                ></VacancyCard>
                <CardActions disableSpacing>
                  <IconButton aria-label='add to favorites'>
                    <FavoriteIcon className='heart' />
                  </IconButton>
                  <IconButton aria-label='share'>
                    <a href='http://uk.linkedin.com/'>
                      <ShareIcon />
                    </a>
                  </IconButton>
                </CardActions>
              </Grid>
            ))}
        </Grid>
      </Container>
    </section>
  );
}
