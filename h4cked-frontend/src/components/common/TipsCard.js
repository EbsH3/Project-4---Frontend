import { Card, CardContent, Typography, CardMedia } from '@mui/material';

export default function TipsCard({ name, detail, sector, image }) {
  return (
    <Card sx={{ maxWidth: 305, height: 370 }}>
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
        <Typography gutterBottom variant='body2' component='div'>
          {detail}
        </Typography>
        <Typography gutterBottom variant='h5' component='div'>
          {sector}
        </Typography>
      </CardContent>
    </Card>
  );
}
