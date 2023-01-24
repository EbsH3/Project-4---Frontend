import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import EmployerRatings from './common/EmployerRatings';
import FeedbackCard from './common/FeedbackCard';
import { useAuthenticated } from '../hooks/useAuthenticated';

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
  const [isUpdated, setIsUpdated] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleEmployer(id))
      .then(({ data }) => {
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
      .map((feedback) => feedback.owner._id)
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
          <img src={singleEmployer?.logo} alt={singleEmployer?.name} />
        </Box>
        <CardContent>
          <Typography variant='h5' component='p'>
            {singleEmployer?.employer}
          </Typography>
          <Typography variant='h5' component='p'>
            {singleEmployer?.location}
          </Typography>
          <Typography variant='h5' component='p'>
            {singleEmployer?.vacancies}
          </Typography>
          <EmployerRatings feedback={singleEmployer?.feedback || 0} />
        </CardContent>

        <CardActions>
          {isLoggedIn && !userHasReviewed && (
            <Link to={`/employers/${singleEmployer?._id}/feedback`}>
              <Button size='small'>Spill the tea ☕️</Button>
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
            {singleEmployer?.feedback.map((review) => (
              <FeedbackCard
                key={review._id}
                text={review.text}
                reviewer={review.owner}
                createdAt={review.createdAt}
                employerId={review.id}
                rating={review.rating}
                setIsUpdated={setIsUpdated}
              ></FeedbackCard>
            ))}
          </Box>
        </Container>
      )}
    </>
  );
}
