// @ts-nocheck
import { Avatar, Box, ListItem, Stack, TextField } from '@mui/material';
import { blue } from '@mui/material/colors';
import CardMain from 'components/main/CardMain';
import LoaderContext from 'context/Loader';
import React, { useContext, useEffect, useState } from 'react';
import services from 'services/services';

const Main = () => {
  const [originalPodcasts, setOriginalPodcasts] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const { showLoader, setShowLoader } = useContext(LoaderContext);

  useEffect(() => {
    services.get100Podcasts().then((data) => {
      const newPodcasts = [];

      data.feed.entry.forEach((p) => {
        newPodcasts.push({
          id: p.id.attributes['im:id'],
          title: p['im:name'].label,
          image: p['im:image'][p['im:image'].length - 1].label,
          author: p['im:artist'].label,
          description: p.summary.label
        });
      });

      setOriginalPodcasts(newPodcasts);
      setPodcasts(newPodcasts);
    });
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  }, []);

  const handleSearch = ({ target }) => {
    const filterByTitle = originalPodcasts.filter((p) =>
      p.title.toLowerCase().includes(target.value.toLowerCase())
    );
    const filterByAuthor = originalPodcasts.filter((p) =>
      p.author.toLowerCase().includes(target.value.toLowerCase())
    );
    const newPodcasts = new Set(filterByTitle.concat(filterByAuthor));

    setPodcasts([...newPodcasts]);
  };

  console.log('podcasts', podcasts);
  return (
    <div>
      {!showLoader ? (
        <Box margin="2%">
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: blue[500] }}>{podcasts.length}</Avatar>
            <TextField
              id="outlined-basic"
              label="Filter podcasts..."
              variant="outlined"
              onChange={handleSearch}
            />
          </Stack>
          {podcasts.length ? (
            podcasts.map((podcast) => {
              return (
                <ListItem
                  key={podcast.id}
                  style={{ float: 'left', display: 'inline', width: '25%' }}
                >
                  <CardMain key={podcast.id} cardMain={podcast} />
                </ListItem>
              );
            })
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

export default Main;
