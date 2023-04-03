import React from 'react';
import { useParams } from 'react-router-dom';

function DetailsPodcast() {
  const { podcastId, episodeId } = useParams();

  console.log(podcastId, episodeId);

  return <div>DetailsPodcast</div>;
}

export default DetailsPodcast;
