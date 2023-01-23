import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextareaAutosize,
} from '@mui/material';
import EmployerRatings from './EmployerRatings';
import { AUTH } from '../../lib/auth';
import { API } from '../../lib/api';
import { useState } from 'react';

export default function FeedbackCard({
  text,
  reviewer,
  employer,
  owner,
  createdAt,
  id,
  reviewId,
  rating,
  setIsUpdated,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [reviewText, setReviewText] = useState(text);
  const [reviewRating, setReviewRating] = useState(rating);

  const toggleEditMode = () => setIsEditMode(!isEditMode);
  const handleReviewTextChange = (e) => setReviewText(e.target.value);

  const saveChanges = () => {
    if (text !== reviewText || rating !== reviewRating) {
      API.PUT(
        API.ENDPOINTS.feedback(id, reviewId),
        {
          text: reviewText,
          employer: employer,
          rating: reviewRating,
        },
        API.getHeaders()
      )
        .then(() => {
          toggleEditMode();
          setIsUpdated(true);
        })
        .catch((e) => console.log(e));
    }
  };

  const deleteReview = () =>
    API.DELETE(API.ENDPOINTS.feedback(id, reviewId), API.getHeaders())
      .then(() => {
        setIsUpdated(true);
      })
      .catch((e) => console.log(e));

  const Rating = () =>
    isEditMode ? (
      <EmployerRatings
        rating={reviewRating}
        size='20px'
        setRating={setReviewRating}
      />
    ) : (
      <EmployerRatings rating={rating} size='20px' />
    );

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {' '}
          {reviewer.owner}{' '}
        </Typography>
        {isEditMode ? (
          <TextareaAutosize
            value={reviewText}
            onChange={handleReviewTextChange}
            style={{ width: '100%', height: '22px' }}
          />
        ) : (
          <Typography variant='h5' component='div'>
            {text}
          </Typography>
        )}
        <Rating />
      </CardContent>
      {(AUTH.isOwner(reviewer._id) || AUTH.getPayLoad().isAdmin) && (
        <CardActions>
          {AUTH.isOwner(reviewer.id) && (
            <Button size='small' onClick={toggleEditMode}>
              {isEditMode ? 'Cancel' : 'Edit Feedback'}
            </Button>
          )}
          <Button
            size='small'
            onClick={isEditMode ? saveChanges : deleteReview}
          >
            {isEditMode ? 'Save Changes' : 'Delete Feedback'}
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
