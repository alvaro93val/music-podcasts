// @ts-nocheck
import { Box, Stack } from '@mui/material';
import CardDetails from 'components/detailsPodcast/CardDetails';
import CardPodcast from 'components/podcast/CardPodcast';
import LoaderContext from 'context/Loader';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import services from 'services/services';

const DetailsPodcast = () => {
  const { podcastId, episodeId } = useParams();

  const [podcast, setPodcast] = useState();
  const [episode, setEpisode] = useState();
  const { showLoader, setShowLoader } = useContext(LoaderContext);

  useEffect(() => {
    services.getOnePodcast(podcastId).then((data) => {
      const p = data.results[0];
      const newPodcast = {
        id: p.collectionId,
        title: p.collectionName,
        image: p.artworkUrl600,
        author: p.artistName
      };

      services.getDetailsPodcast(p.feedUrl, p.collectionId).then((data) => {
        newPodcast.description =
          data.rss.channel['content:encoded'] ?? data.rss.channel.description;
        const episodes = data.rss.channel.item.reverse();

        const episodeData = {
          title: episodes[episodeId - 1].title,
          date: episodes[episodeId - 1].pubDate,
          duration: episodes[episodeId - 1]['itunes:duration'],
          description:
            episodes[episodeId - 1]['content:encoded'] ?? episodes[episodeId - 1].description,
          play: episodes[episodeId - 1].enclosure
            ? episodes[episodeId - 1].enclosure['@_url']
            : episodes[episodeId - 1].link
        };

        setPodcast(newPodcast);
        setEpisode(episodeData);
      });
    });
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  }, []);

  return (
    <div>
      {!showLoader ? (
        <Box margin="2%">
          {podcast ? (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            >
              <CardPodcast cardPodcast={podcast} />
              <CardDetails cardDetails={episode} />
            </Stack>
          ) : (
            <></>
          )}
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DetailsPodcast;
