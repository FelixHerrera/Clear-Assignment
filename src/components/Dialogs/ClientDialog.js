import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import MemberList from './MemberList/MemberList';

import swrFetch from '../../common/swrFetch';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginLeft: theme.spacing(2),
  },
}));

const ClientDialog = ({ id, open, onClose }) => {
  const classes = useStyles();
  const { data, error } = swrFetch(`https://5fe220547a9487001768215e.mockapi.io/api/v1/organization/${id}`);

  let content = <LinearProgress />;

  if (error) {
    content = <div>Error</div>;
  } else if (data) {
    content = (
      <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={() => onClose()}>
        <DialogTitle id="simple-dialog-title">Organization Information</DialogTitle>
        <List>
          <ListItem>
            <Typography>
              Name:
              {' '}
              {data.name}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              {`Public/Private: ${data.is_public ? 'Public' : 'Private'}`}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              Headcount:
              {' '}
              {data.headcount}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              Address:
              {' '}
              {data.address_1}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              City:
              {' '}
              {data.city}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              State:
              {' '}
              {data.state}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              Zipcode:
              {' '}
              {data.zip_code}
            </Typography>
          </ListItem>
        </List>
        <MemberList id={id} />
      </Dialog>
    );
  }

  return content;
};

export default ClientDialog;
