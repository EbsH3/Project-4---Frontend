import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, TextareaAutosize, Button } from '@mui/material';
import EmployerRatings from './common/EmployerRatings';
import { API } from '../lib/api';

export default function AddFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [textValue, setTextValue] = useState('');
  const [rating, setRating] = useState(0);

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(
      API.ENDPOINTS.addFeedback(id),
      {
        text: textValue,
        rating: rating,
      },
      API.getHeaders()
    )
      .then(({ data }) => {
        navigate(`/employers/${id}`);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Container
      maxWidth='lg'
      sx={{
        pt: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box>
          <TextareaAutosize
            name='feedback'
            value={textValue}
            placeholder='Tell us about our experience here'
            label='Feedback'
            type='textarea'
            onChange={handleTextChange}
            minRows={10}
            style={{ width: 500 }}
          />
        </Box>
        <Box>
          <EmployerRatings rating={rating} setRating={setRating} />
        </Box>
        <Button type='submit'>Submit</Button>
      </form>
    </Container>
  );
}
