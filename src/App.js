import Layout from 'Layout';
import DetailsPodcast from 'pages/detailsPodcast';
import Main from 'pages/main';
import Podcast from 'pages/podcast';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <header>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/podcast/:podcastId" element={<Podcast />} />
            <Route path="/podcast/:podcastId/episode/:episodeId" element={<DetailsPodcast />} />
            <Route path="*" element={<div>404, Not Found!</div>} />
          </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
