import React from 'react';
import { useParams } from 'react-router-dom';

const DetailsPodcast = () => {
  const { podcastId, episodeId } = useParams();

  console.log('podcastId', podcastId, 'episodeId', episodeId);

  return <div>DetailsPodcast</div>;
};

export default DetailsPodcast;
