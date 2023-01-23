import { Card, CardContent, Typography, CardMedia } from '@mui/material';

export default function SalaryCard({
  title,
  levelOfExperience,
  salaryBenchmark,
  sector,
  image,
}) {
  return (
    <Card sx={{ maxWidth: 345, height: 450 }}>
      <CardMedia
        component='img'
        image={image}
        alt={title}
        sx={{ maxHeight: 345, objectFit: 'contain' }}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <Typography gutterBottom variant='h5' component='div'>
          {levelOfExperience}
        </Typography>
        <Typography gutterBottom variant='h5' component='div'>
          {salaryBenchmark}
        </Typography>
        <Typography gutterBottom variant='h5' component='div'>
          {sector}
        </Typography>
      </CardContent>
    </Card>
  );
}
