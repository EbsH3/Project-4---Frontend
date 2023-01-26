import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
// import EmployerRatings from './common/EmployerRatings';
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
        sx={{ display: 'flex', flexDirection: 'column' }}
        className='singleEmployer'
      >
        <CardContent>
          <Typography variant='h1' component='p'>
            {singleEmployer?.employer}
          </Typography>
          <Typography variant='h4'>{singleEmployer?.location}</Typography>
          {/* <EmployerRatings rating={singleEmployer?.rating || 0} /> */}
        </CardContent>
        <Box>
          <img
            className='singleEmployerImage'
            src={singleEmployer?.logo}
            alt={singleEmployer?.employer}
          />
        </Box>

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
            {singleEmployer?.feedback.map((f) => {
              console.log({ f });
              return (
                <FeedbackCard
                  feedback={f}
                  employerId={id}
                  setIsUpdated={setIsUpdated}
                ></FeedbackCard>
              );
            })}
          </Box>

          <Box sx={{ width: 200 }}>
            <h3 className='activeRoles'>Active Roles</h3>
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
