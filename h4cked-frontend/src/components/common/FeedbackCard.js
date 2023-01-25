import * as React from 'react';
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
  owner,
  employerId,
  reviewId,
  rating,
  setIsUpdated,
  feedback,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [reviewText, setReviewText] = useState(feedback.text);
  const [reviewRating, setReviewRating] = useState(feedback.rating);

  const toggleEditMode = () => setIsEditMode(!isEditMode);
  const handleReviewTextChange = (e) => setReviewText(e.target.value);

  const saveChanges = () => {
    if (feedback.text !== reviewText || feedback.rating !== reviewRating) {
      API.PUT(
        API.ENDPOINTS.singleReview(feedback.id),
        { ...feedback, text: reviewText, owner: feedback.owner.id },
        API.getHeaders()
      )
        .then(() => {
          toggleEditMode();
          setIsUpdated(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const deleteReview = () =>
    API.DELETE(API.ENDPOINTS.singleReview(feedback.id), API.getHeaders())
      .then(() => {
        setIsUpdated(true);
      })
      .catch((e) => console.error(e));

  const Rating = () =>
    isEditMode ? (
      <EmployerRatings
        rating={reviewRating}
        size='10px'
        setRating={setReviewRating}
      />
    ) : (
      <EmployerRatings rating={rating} size='10px' />
    );

  return (
    <Card sx={{ width: 500 }}>
      <CardContent>
        <Typography sx={{ fontSize: 10 }} color='text.secondary' gutterBottom>
          {feedback.owner.username}
        </Typography>
        <Typography>{feedback.text}</Typography>
        {isEditMode ? (
          <TextareaAutosize
            value={reviewText}
            onChange={handleReviewTextChange}
            style={{ width: '50%', height: '22px' }}
          />
        ) : (
          <Typography variant='h1' component='div'>
            {text}
          </Typography>
        )}
        <Rating />
      </CardContent>
      {AUTH.isOwner(feedback.owner.id) && (
        <CardActions>
          {AUTH.isOwner(feedback.owner.id) && (
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
