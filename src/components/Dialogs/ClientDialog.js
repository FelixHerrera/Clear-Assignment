import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import MemberList from './MemberList/MemberList';
import ErrorMessage from '../ErrorMessage';
import swrFetch from '../../common/swrFetch';
import NotFoundMessage from '../NotFoundMessage';

const ClientDialog = ({ id, open, onClose }) => {
  const { data, isError, isLoading } = swrFetch(`https://5fe220547a9487001768215e.mockapi.io/api/v1/organization/${id}`);

  let content = <LinearProgress />;

  if (isError) {
    content = <ErrorMessage />;
  } else if (!isLoading) {
    content = (
      data.id ? (
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
      ) : <NotFoundMessage />
    );
  }

  return content;
};

export default ClientDialog;
