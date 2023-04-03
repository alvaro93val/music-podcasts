import { ListItem } from '@mui/material';
import CardMain from 'components/main/CardMain';
import LoaderContext from 'context/Loader';
import React, { useContext, useEffect, useState } from 'react';
import services from 'services/services';

function Main() {
  const [podcasts, setPodcasts] = useState([]);
  const { setShowLoader } = useContext(LoaderContext);

  useEffect(() => {
    services.get100Podcasts().then((data) => {
      const newPodcasts = [];
      console.log(data?.feed?.entry);
      data.feed.entry.forEach((p) => {
        newPodcasts.push({
          id: p.id.attributes['im:id'],
          title: p['im:name'].label,
          image: p['im:image'][p['im:image'].length - 1].label,
          author: p['im:artist'].label
        });
      });
      setTimeout(() => {
        setPodcasts(newPodcasts);
        setShowLoader(false);
      }, 1000);
    });
  }, []);

  console.log(podcasts);
  return (
    <div>
      {podcasts.length ? (
        podcasts.map((podcast) => {
          return (
            <ListItem key={podcast.id} style={{ float: 'left', display: 'inline', width: '25%' }}>
              <CardMain key={podcast.id} cardMain={podcast} />
            </ListItem>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default Main;
