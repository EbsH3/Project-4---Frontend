import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function EmployerCard({ name, location, image, sector, id }) {
  const navigate = useNavigate();
  const navigateToEmployer = () => navigate(`/employer/${id}/`);

  return (
    <Card
      sx={{
        maxWidth: 300,
        height: 300,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CardActionArea onClick={navigateToEmployer}>
        <CardContent>
          <Typography
            variant='h6'
            component='div'
            sx={{ alignItems: 'center', margin: 1 }}
          >
            {name}
          </Typography>
          <Typography sx={{ alignItems: 'center', margin: 1 }}>
            {location}
          </Typography>
        </CardContent>
        <CardMedia
          className='media'
          component='img'
          image={image}
          alt={name}
          sx={{
            maxHeight: 200,
            maxWidth: 200,
            // objectFit: 'contain',
            paddingLeft: 3,
          }}
        />

        <Button sx={{ paddingLeft: 20 }}>
          <Link to='/feedback'>Review</Link>
        </Button>
        {/* 
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {sector}
          </Typography>
        </CardContent> */}
      </CardActionArea>
    </Card>
  );
}
