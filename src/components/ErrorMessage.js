import React from 'react';
import Paper from 'material-ui/Paper';
import { Typography } from '@material-ui/core';

const ErrorMessage = () => (
  <Paper>
    <Typography>
      Unable to load data.
    </Typography>
  </Paper>
);

export default ErrorMessage;
