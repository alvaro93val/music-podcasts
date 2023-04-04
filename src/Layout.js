import { Box, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import LoaderContext from 'context/Loader';
import React, { useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const { showLoader, setShowLoader } = useContext(LoaderContext);
  const location = useLocation();

  React.useEffect(() => {
    setShowLoader(true);
  }, [location]);

  console.log('showLoader', showLoader);

  return (
    <div>
      <div>
        <Box marginX="2%">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            height={40}
          >
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" color="blue">
                Podcaster
              </Typography>
            </Link>
            {showLoader ? <CircularProgress size={30} /> : <></>}
          </Grid>
        </Box>
        <Divider />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
