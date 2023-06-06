import axios from 'axios';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
const url100Podcasts = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
const urlOnePodcast = 'https://itunes.apple.com/lookup?id=';
const urlAllowCors = 'https://api.allorigins.win/raw?url=';

const get100Podcasts = () => {
  const request = axios.get(url100Podcasts);
  const date = localStorage.getItem('date100podcast');
  const podcasts = localStorage.getItem('100podcasts');

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
  const request = axios.get(`${urlAllowCors}${urlOnePodcast}${podcastId}`);
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
  const request = axios.get(`${feedUrl}`);
  const date = localStorage.getItem(`dateDetails-${podcastId}`);
  const details = localStorage.getItem(`details-${podcastId}`);

  if (date && details && isLessOneDay(date)) {
    return new Promise((resolve) => resolve(JSON.parse(details)));
  } else {
    return request
      .then((response) => {
        if (!XMLValidator.validate(response.data)) {
          throw new Error('XML not valid');
        }
        const options = {
          attributeNamePrefix: '@_',
          attrNodeName: 'attr',
          textNodeName: '#text',
          ignoreAttributes: false,
          ignoreNameSpace: false,
          allowBooleanAttributes: true,
          parseNodeValue: true,
          parseAttributeValue: true,
          trimValues: true,
          cdataTagName: '__cdata',
          cdataPositionChar: '\\c',
          parseTrueNumberOnly: false,
          arrayMode: true,
          stopNodes: ['parse-me-as-string']
        };
        const parser = new XMLParser(options);
        const jsonData = parser.parse(response.data);
        localStorage.setItem(`dateDetails-${podcastId}`, new Date().toISOString());
        localStorage.setItem(`details-${podcastId}`, JSON.stringify(jsonData));
        return jsonData;
      })
      .catch((error) => console.error(error));
  }
};

export default { get100Podcasts, getOnePodcast, getDetailsPodcast };
