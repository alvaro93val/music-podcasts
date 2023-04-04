import { Divider } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const CardPodcast = (props) => {
  // const navigate = useNavigate();

  return (
    <Card sx={{ height: 750, width: 350 }} elevation={9}>
      <CardMedia
        sx={{ height: 140, margin: 5 }}
        image={props.cardPodcast.image}
        title={props.cardPodcast.title}
      />
      <Divider />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <b>{props.cardPodcast.title}</b>
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          <i>by {props.cardPodcast.author}</i>
        </Typography>
        <Divider />
        <Typography gutterBottom variant="subtitle1" component="div">
          Description:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <i dangerouslySetInnerHTML={{ __html: props.cardPodcast.description }} />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardPodcast;
