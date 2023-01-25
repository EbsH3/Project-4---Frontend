import { useNavigate } from 'react-router-dom';
import { Box, Paper, Stack, CardContent, CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function VacancyCard({
  title,
  location,
  url,
  employer,
  id,
  salary,
  sector,
}) {
  const navigate = useNavigate();
  const navigateToVacancy = () => navigate(`/vacancies/${id}`);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ Width: '100%' }}>
      <CardActionArea onClick={navigateToVacancy}>
        <CardContent>
          <Stack direction='column' spacing={3}>
            <Item variant='h5' component='div'>
              {title}
              <br></br>
              {location}
              <br></br>
              {salary}

              <br></br>
              {sector}
              <a href={url} target='_blank' rel='noreferrer'>
                View Job Description
              </a>
            </Item>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Box>
  );
}
