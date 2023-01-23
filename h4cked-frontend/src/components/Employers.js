import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { Container, Grid } from '@mui/material';
import EmployerCard from './common/EmployerCard';
import Search from './common/Search';

export default function Employers() {
  // const navigate = useNavigate();
  const [employers, setEmployers] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filterEmployers = () => {
    const regex = new RegExp(searchQuery, 'i');
    const filteredEmployers = employers.filter((employer) => {
      return employer.employer.match(regex);
    });
    return filteredEmployers;
  };

  useEffect(() => {
    API.GET(API.ENDPOINTS.employers)
      .then(({ data }) => {
        setEmployers(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  // const employerPage = () => navigate(`/employers/${_id}`);

  return (
    <>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          <Search value={searchQuery} handleChange={setSearchQuery} />
          {employers &&
            filterEmployers().map((employer) => (
              <Grid item xs={4} key={employer._id}>
                <EmployerCard
                  name={employer.employer}
                  location={employer.location}
                  image={employer.logo}
                  sector={employer.sector}
                ></EmployerCard>{' '}
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
