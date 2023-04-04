import { CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const CardDetails = (props) => {
  return (
    <Card sx={{ minHeight: 400, width: '70%' }} elevation={9}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <b>{props.cardDetails.title}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <i dangerouslySetInnerHTML={{ __html: props.cardDetails.description }} />
        </Typography>
      </CardContent>
      <CardActions>
        <audio controls src={props.cardDetails.play} style={{ width: '100%' }} />
      </CardActions>
    </Card>
  );
};

export default CardDetails;
