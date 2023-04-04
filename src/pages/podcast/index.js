// @ts-nocheck
import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material';
import CardPodcast from 'components/podcast/CardPodcast';
import ListEpisodes from 'components/podcast/ListEpisodes';
import LoaderContext from 'context/Loader';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import services from 'services/services';

const Podcast = () => {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState();
  const [details, setDetails] = useState([]);
  const { showLoader, setShowLoader } = useContext(LoaderContext);

  console.log('podcastId', podcastId);
  console.log('podcast', podcast);
  console.log('showLoader', showLoader);
  console.log('details', details);

  useEffect(() => {
    services.getOnePodcast(podcastId).then((data) => {
      console.log('data', data);
      const p = data.results[0];
      const newPodcast = {
        id: p.collectionId,
        title: p.collectionName,
        image: p.artworkUrl600,
        author: p.artistName
      };

      services.getDetailsPodcast(p.feedUrl, p.collectionId).then((data) => {
        console.log('getDetailsPodcast', data);

        newPodcast.description =
          data.rss.channel['content:encoded'] ?? data.rss.channel.description;
        const episodes = [];
        data.rss.channel.item.forEach((episode) => {
          console.log('episode', episode);
          episodes.push({
            title: episode.title,
            date: episode.pubDate,
            duration: episode['itunes:duration'],
            description: episode['content:encoded'],
            play: episode.enclosure ? episode.enclosure['@_url'] : episode.link
          });
        });

        console.log('newPodcast', newPodcast);
        console.log('episodes', episodes);
        setPodcast(newPodcast);
        setDetails(episodes);
      });
    });
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  }, []);

  // eslint-disable-next-line react/jsx-no-undef
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
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                width="100%"
              >
                <AppBar position="static" color="transparent" elevation={9}>
                  <Toolbar>
                    <Typography variant="h6">Episodes: {details.length}</Typography>
                  </Toolbar>
                </AppBar>
                <ListEpisodes detailsPodcast={details} />
              </Stack>
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

export default Podcast;
