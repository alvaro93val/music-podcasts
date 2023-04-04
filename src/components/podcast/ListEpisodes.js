import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

const ListEpisodes = (props) => {
  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return `${formatNumber(month)}/${formatNumber(day)}/${year}`;
  };

  const formatDuration = (duration) => {
    if (typeof duration === 'string' && duration.includes(':')) {
      return duration;
    }
    const hours = Math.floor(Math.floor(duration / 60) / 60);
    const minutes = Math.floor(duration / 60) % 60;
    const seconds = duration % 60;

    return `${hours ? formatNumber(hours) + ':' : ''}${formatNumber(minutes)}:${formatNumber(
      seconds
    )}`;
  };

  return (
    <TableContainer component={Paper} elevation={9}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.detailsPodcast.map((episode) => (
            <TableRow
              key={episode.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {episode.title}
              </TableCell>
              <TableCell align="right">{formatDate(episode.date)}</TableCell>
              <TableCell align="right">{formatDuration(episode.duration)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListEpisodes;
