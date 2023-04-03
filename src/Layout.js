import { Box, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import LoaderContext from 'context/Loader';
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  const { showLoader } = useContext(LoaderContext);
  console.log(showLoader);

  return (
    <div>
      <div>
        <Box marginX="2%">
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" color="blue">
                Podcaster
              </Typography>
            </Link>
            {showLoader ? <CircularProgress /> : <></>}
          </Grid>
        </Box>
        <Divider />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
