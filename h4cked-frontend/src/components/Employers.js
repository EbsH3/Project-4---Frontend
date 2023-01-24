import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { Container, Grid } from '@mui/material';
import EmployerCard from './common/EmployerCard';
import Search from './common/Search';
// import SectorCard from './common/SectorCard';
// import FeedbackCard from './common/FeedbackCard';

export default function Employers() {
  // const navigate = useNavigate();
  const [employers, setEmployers] = useState(null);
  // const [feedback, setFeedback] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  // const [sectors, setSectors] = useState(null);

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

  // useEffect(() => {
  //   API.GET(API.ENDPOINTS.sectors)
  //     .then(({ data }) => {
  //       setSectors(data);
  //     })
  //     .catch(({ message, response }) => {
  //       console.error(message, response);
  //     });
  // }, []);

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
                ></EmployerCard>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}
