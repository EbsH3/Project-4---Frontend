import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import Collapse from '@mui/material/Collapse';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import TipsCard from './common/TipsCard';
import { Grid } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TipsAndTricks() {
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

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: 900,
        flexDirection: 'row',
        paddingLeft: 60,
        paddingRight: 120,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary' }} aria-label='recipe'>
            IT
          </Avatar>
        }
        title='Interview Tips 101'
      />
      <Card className='tips' container>
        {tips?.map((tip) => (
          <Grid item xs={12} key={tip.detail}>
            <TipsCard name={tip.name} image={tip.image}></TipsCard>
          </Grid>
        ))}
      </Card>

      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <a href='http://www.linkedin.com'>
            <ShareIcon />
          </a>
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        {tips?.map((tip) => (
          <CardContent>
            <Typography paragraph>
              <TipsCard detail={tip.detail}></TipsCard>
            </Typography>
          </CardContent>
        ))}
      </Collapse>
    </Card>
  );
}
