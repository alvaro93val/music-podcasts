import React from 'react';
import { useParams } from 'react-router-dom';

function Podcast() {
  const { podcastId } = useParams();

  console.log(podcastId);

  return <div>Podcast</div>;
}

export default Podcast;
