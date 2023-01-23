import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { Container, Grid } from '@mui/material';
import TipsCard from './common/TipsCard';

export default function Tips() {
  const [tips, setTips] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.tipsTricks)
      .then(({ data }) => {
        setTips(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2}>
        {tips?.map((tip) => (
          <Grid item xs={4} key={tip.detail}>
            <TipsCard
              name={tip.name}
              detail={tip.detail}
              sector={tip.sector}
              image={tip.image}
            ></TipsCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// const Tips = () => {
//   return (
//     <div className='home'>
//       <h1>Tips and Tricks</h1>
//     </div>
//   );
// };

// export default Tips;
