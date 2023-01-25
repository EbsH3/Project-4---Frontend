import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextareaAutosize,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import EmployerRatings from './common/EmployerRatings';
import { API } from '../lib/api';

export default function AddFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [textValue, setTextValue] = useState('');
  const [rating, setRating] = useState(0);
  const [employers, setEmployers] = useState([]);

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  useEffect(() => {
    API.GET(API.ENDPOINTS.employers)
      .then(({ data }) => setEmployers(data))
      .catch((e) => console.log(e));
  }, []);

  console.log(employers);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(employers);
    API.POST(
      API.ENDPOINTS.createReview,
      {
        text: textValue,
        employers: employers,
        rating: rating,
      },
      API.getHeaders()
    )
      .then(() => {
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
          <FormControl fullWidth>
            <InputLabel id='employer'>employer</InputLabel>
            <Select
              size='small'
              labelId='employer'
              value={employers}
              label='Employer'
              name='employer'
            >
              <MenuItem value=''>None</MenuItem>
              {employers.map((employer) => (
                <MenuItem key={employer.id} value={employer.id}>
                  {employer.employer}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <TextareaAutosize
            name='feedback'
            value={textValue}
            placeholder='Tell us about your experience here'
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
