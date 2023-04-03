import axios from 'axios';
const url100Podcasts = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
const urlOnePodcasts = 'https://itunes.apple.com/lookup?id=';

const get100Podcasts = () => {
  const request = axios.get(url100Podcasts);
  const date = localStorage.getItem('date');
  const podcast = localStorage.getItem('podcast');
  console.error(date);
  console.error(podcast);

  if (date && podcast && isLessOneDay(date)) {
    return new Promise((resolve) => resolve(JSON.parse(podcast)));
  } else {
    return request
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('date', new Date().toISOString());
        localStorage.setItem('podcast', JSON.stringify(response.data));
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  }
};

const isLessOneDay = (date) => {
  const currentDate = new Date().getTime();
  const oldDate = new Date(date).getTime();

  return currentDate - oldDate < 86400000;
};

const getOnePodcasts = (/** @type {number} */ podcastId) => {
  const request = axios.get(`${urlOnePodcasts}${podcastId}`);

  return request
    .then((response) => response.data)
    .catch(function (error) {
      console.error(error);
    });
};

export default { get100Podcasts, getOnePodcasts };
