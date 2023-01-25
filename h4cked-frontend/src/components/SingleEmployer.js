import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import EmployerRatings from './common/EmployerRatings';
import FeedbackCard from './common/FeedbackCard';
import { useAuthenticated } from '../hooks/useAuthenticated';
import VacancyCard from './common/VacancyCard';

import {
  Container,
  Box,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@mui/material';

export default function SingleEmployer() {
  const [isLoggedIn] = useAuthenticated();
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleEmployer, setSingleEmployer] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleEmployer(id))
      .then(({ data }) => {
        console.log(data);
        setSingleEmployer(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
    setIsUpdated(false);
  }, [id, isUpdated]);

  const allEmployers = () => navigate('/employers');

  const userHasReviewed = useMemo(() => {
    return singleEmployer?.feedback
      .map((feedback) => feedback.owner.id)
      .some((id) => AUTH.isOwner(id));
  }, [singleEmployer]);

  return (
    <>
      <Container
        maxWidth='lg'
        sx={{ display: 'flex' }}
        className='singleEmployer'
      >
        <Box>
          <img src={singleEmployer?.logo} alt={singleEmployer?.employer} />
        </Box>
        <CardContent>
          <Typography variant='h5' component='p'>
            {singleEmployer?.employer} - {singleEmployer?.location}
          </Typography>

          <EmployerRatings rating={singleEmployer?.rating || 0} />
        </CardContent>

        <CardActions>
          {isLoggedIn && !userHasReviewed && (
            <Link to={`/feedback`}>
              <Button size='small'>Add Feedback</Button>
            </Link>
          )}

          <Button size='small' onClick={allEmployers}>
            Browse other Employers
          </Button>
        </CardActions>
      </Container>
      {!!singleEmployer?.feedback.length && (
        <Container maxWidth='lg'>
          <Box>
            {singleEmployer?.feedback.map((f) => (
              <FeedbackCard
                key={f.id}
                text={f.text}
                reviewer={f.owner}
                employerId={id}
                reviewId={f.id}
                rating={f.rating}
                setIsUpdated={setIsUpdated}
              ></FeedbackCard>
            ))}
          </Box>

          <Box>
            <h1>Live Jobs</h1>
            {singleEmployer?.vacancies.map((vacancy) => (
              <VacancyCard
                title={vacancy.title}
                location={vacancy.location}
                salary={vacancy.salary}
                url={vacancy.url}
              ></VacancyCard>
            ))}
          </Box>
        </Container>
      )}
    </>
  );
}
