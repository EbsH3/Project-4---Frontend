import { Card, CardContent, Typography } from '@mui/material';

export default function SectorCard({ id, name }) {
  return (
    <Card sx={{ maxWidth: 300, height: 300 }}>
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}
