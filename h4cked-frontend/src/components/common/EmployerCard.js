import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material';

export default function EmployerCard({ name, location, image, sector, id }) {
  const navigate = useNavigate();
  const navigateToEmployer = () => navigate(`/employer/${id}`);

  return (
    <Card sx={{ maxWidth: 345, height: 450 }}>
      <CardActionArea onClick={navigateToEmployer}>
        <CardMedia
          component='img'
          image={image}
          alt={name}
          sx={{ maxHeight: 345, objectFit: 'contain' }}
        />

        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {location}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {sector}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
