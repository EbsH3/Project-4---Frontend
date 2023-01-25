import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [textValue, setTextValue] = useState('');
  const [rating, setRating] = useState(0);
  const [employers, setEmployers] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState('');

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  useEffect(() => {
    API.GET(API.ENDPOINTS.employers)
      .then(({ data }) => setEmployers(data))
      .catch((e) => console.log(e));
  }, []);

  console.log(employers);

  const handleEmployerChange = (e) => {
    setSelectedEmployer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedEmployerId = employers.find(
      (e) => e.employer === selectedEmployer
    ).id;
    console.log({ selectedEmployerId });
    API.POST(
      API.ENDPOINTS.createReview,
      {
        text: textValue,
        employer: selectedEmployerId,
        // rating: rating
      },
      API.getHeaders()
    )
      .then(() => {
        navigate(`/employers/${selectedEmployerId}`);
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
              value={selectedEmployer}
              label='Employer'
              name='employer'
              onChange={handleEmployerChange}
            >
              <MenuItem value=''>None</MenuItem>
              {employers.map((employer) => (
                <MenuItem key={employer.id} value={employer.employer}>
                  {employer.employer}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ pt: 5, display: 'flex', justifyContent: 'center' }}>
          <TextareaAutosize
            name='feedback'
            value={textValue}
            placeholder='Tell us about your experience here'
            label='Feedback'
            type='textarea'
            onChange={handleTextChange}
            minRows={20}
            style={{ width: 1000 }}
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
