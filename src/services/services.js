import axios from 'axios';
const url100Podcasts = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
const urlOnePodcast = 'https://itunes.apple.com/lookup?id=';

const get100Podcasts = () => {
  const request = axios.get(url100Podcasts);
  const date = localStorage.getItem('date100podcast');
  const podcasts = localStorage.getItem('100podcasts');
  console.error(date);
  console.error(podcasts);

  if (date && podcasts && isLessOneDay(date)) {
    return new Promise((resolve) => resolve(JSON.parse(podcasts)));
  } else {
    return request
      .then((response) => {
        localStorage.setItem('date100podcast', new Date().toISOString());
        localStorage.setItem('100podcasts', JSON.stringify(response.data));
        return response.data;
      })
      .catch((error) => console.error(error));
  }
};

const isLessOneDay = (date) => {
  const currentDate = new Date().getTime();
  const oldDate = new Date(date).getTime();

  return currentDate - oldDate < 86400000;
};

const getOnePodcast = (podcastId) => {
  const request = axios.get(`https://api.allorigins.win/raw?url=${urlOnePodcast}${podcastId}`);
  const date = localStorage.getItem(`dateOnePodcast-${podcastId}`);
  const podcast = localStorage.getItem(`onePodcast-${podcastId}`);

  if (date && podcast && isLessOneDay(date)) {
    return new Promise((resolve) => resolve(JSON.parse(podcast)));
  } else {
    return request
      .then((response) => {
        localStorage.setItem(`dateOnePodcast-${podcastId}`, new Date().toISOString());
        localStorage.setItem(`onePodcast-${podcastId}`, JSON.stringify(response.data));
        return response.data;
      })
      .catch((error) => console.error(error));
  }
};

const getDetailsPodcast = (feedUrl, podcastId) => {
  const request = axios.get(`${feedUrl}.json`);
  const date = localStorage.getItem(`dateDetails-${podcastId}`);
  const details = localStorage.getItem(`details-${podcastId}`);

  if (date && details && isLessOneDay(date)) {
    return new Promise((resolve) => resolve(JSON.parse(details)));
  } else {
    return request
      .then((response) => {
        localStorage.setItem(`dateDetails-${podcastId}`, new Date().toISOString());
        localStorage.setItem(`details-${podcastId}`, JSON.stringify(response.data));
        return response.data;
      })
      .catch((error) => console.error(error));
  }
};

export default { get100Podcasts, getOnePodcast, getDetailsPodcast };
