import { Card, CardContent, Typography, CardMedia } from '@mui/material';

export default function SalaryCard({
  title,
  levelOfExperience,
  salaryBenchmark,
  sector,
  image,
}) {
  return (
    <Card sx={{ maxWidth: 305, height: 290, borderRadius: 100 }}>
      <CardMedia
        className='media'
        component='img'
        image={image}
        alt={title}
        sx={{ maxHeight: 345, objectFit: 'contain' }}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div' paddingLeft={5}>
          {title}
        </Typography>

        <Typography gutterBottom variant='h5' component='div' paddingLeft={5}>
          {salaryBenchmark}
        </Typography>
        <Typography gutterBottom variant='h5' component='div' paddingLeft={9}>
          {levelOfExperience}
        </Typography>
      </CardContent>
    </Card>
  );
}
