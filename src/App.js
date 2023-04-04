import Layout from 'Layout';
import { LoaderProvider } from 'context/Loader';
import DetailsPodcast from 'pages/detailsPodcast';
import Main from 'pages/main';
import Podcast from 'pages/podcast';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <header>
        <LoaderProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Main />} />
              <Route path="/podcast/:podcastId" element={<Podcast />} />
              <Route path="/podcast/:podcastId/episode/:episodeId" element={<DetailsPodcast />} />
              <Route path="*" element={<div>404, Not Found!</div>} />
            </Route>
          </Routes>
        </LoaderProvider>
      </header>
    </div>
  );
};

export default App;
