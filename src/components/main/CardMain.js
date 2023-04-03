import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';

function CardMain(props) {
  console.log(props.cardMain);
  return (
    <Card sx={{ height: 320, width: 300 }}>
      <CardMedia sx={{ height: 140 }} image={props.cardMain.image} title={props.cardMain.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.cardMain.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {props.cardMain.author}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardMain;
