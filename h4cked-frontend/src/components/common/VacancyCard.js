import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

export default function VacancyCard({ title, location, url, employer, id }) {
  const navigate = useNavigate();
  const navigateToVacancy = () => navigate(`/vacancies/${id}`);

  return (
    <Card sx={{ maxWidth: 345, height: 450 }}>
      <CardActionArea onClick={navigateToVacancy}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography gutterBottom variant='h5' component='div'>
            {location}
          </Typography>
          <Typography>
            <a href={url} target='_blank' rel='noreferrer'>
              View Job Description{' '}
            </a>
          </Typography>
          <Typography gutterBottom variant='h5' component='div'>
            {employer.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
