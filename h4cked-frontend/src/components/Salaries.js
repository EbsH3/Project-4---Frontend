import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { Container, Grid } from '@mui/material';
import SalaryCard from './common/SalaryCard';

export default function Salaries() {
  const [salaries, setSalaries] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.salaryInfo)
      .then(({ data }) => {
        setSalaries(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  return (
    <Container maxWidth='lg'>
      <h1 className='salaryHeading'>Salary Benchmarks</h1>
      <Grid container spacing={2}>
        {salaries?.map((salary) => (
          <Grid item xs={4} key={salary.title}>
            <SalaryCard
              title={salary.title}
              levelOfExperience={salary.level_of_experience}
              salaryBenchmark={salary.salary_benchmark}
              sector={salary.sector}
              image={salary.image}
            ></SalaryCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// const Salaries = () => {
//   return (
//     <div className='home'>
//       <h1>Salary Info</h1>
//     </div>
//   );
// };
// <Typography gutterBottom variant='h5' component='div'>
//         {title}
//       </Typography>
//       <Typography gutterBottom variant='h5' component='div'>
//         {levelOfExperience}
//       </Typography>
//       <Typography gutterBottom variant='h5' component='div'>
//         {salaryBenchmark}
//       </Typography>
//       <Typography gutterBottom variant='h5' component='div'>
//         {sector}

// export default Salaries;
