import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Container,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { API } from '../lib/api';

export default function EditVacancy() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salary: '',
    url: '',
    employer: 0,
  });

  const [error, setError] = useState(false);
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.employers)
      .then(({ data }) => setVacancies(data))
      .catch((e) => console.log(e));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = formData.EditVacancy
      ? formData
      : {
          title: formData.name,
          location: formData.location,
          salary: formData.salary,
          url: formData.url,
          employer: formData.employer,
        };

    API.PUT(API.ENDPOINTS.vacancies, data, API.getHeaders())
      .then(({ data }) => {
        navigate(`/vacancies/${data.id}`);
      })
      .catch((e) => {
        if (e.status === 301) {
          setError(true);
        }
        console.log(e);
      });
  };

  return (
    <Container
      className='formBox'
      maxWidth='lg'
      sx={{ display: 'flex', pt: 15 }}
    >
      <form className='editForm' obSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            size='small'
            type='text'
            value={formData.title}
            onChange={handleChange}
            error={error}
            label='Title'
            name='title'
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            size='small'
            type='text'
            value={formData.location}
            onChange={handleChange}
            error={error}
            label='Location'
            name='location'
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            size='small'
            type='text'
            value={formData.salary}
            onChange={handleChange}
            error={error}
            label='Salary'
            name='salary'
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            size='small'
            type='text'
            value={formData.url}
            onChange={handleChange}
            error={error}
            label='Image URL'
            name='url'
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel id='employer'>Employer</InputLabel>
            <Select
              size='small'
              labelId='employer'
              value={formData.employer}
              label='Employer'
              name='Employer'
              onChange={handleChange}
            >
              <MenuItem value=''>None</MenuItem>
              {vacancies.map((employer) => (
                <MenuItem key={employer.id} value={employer.id}>
                  {employer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel id='vacancy'>Vacancy</InputLabel>
            <Select
              size='small'
              labelId='vacancy'
              value={formData.vacancy}
              label='Vacancy'
              name='Vacancy'
              onChange={handleChange}
            >
              <MenuItem value=''>None</MenuItem>
              {vacancies.map((vacancy) => (
                <MenuItem key={vacancy.id} value={vacancy.id}>
                  {vacancy.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button type='submit'>Edit Vacancy</Button>
      </form>
    </Container>
  );
}
