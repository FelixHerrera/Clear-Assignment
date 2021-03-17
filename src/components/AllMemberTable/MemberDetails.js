import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

const MemberDetails = ({ member, open, onClose }) => {
  const [orgId, setOrgId] = useState(member.organization_id);
  const handleSubmit = async () => {
    await fetch(`/api/members/${member.id}`, {
      method: 'POST',
      body: JSON.stringify({ organization_id: orgId }),
    });
    onClose();
  };
  const handleOnChange = (e) => {
    setOrgId(e.target.value);
  };
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={() => onClose()}>
      <DialogTitle id="simple-dialog-title">Organization Information</DialogTitle>
      <List>
        <ListItem>
          <Typography>
            Name:
            {' '}
            {member.name}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            Organization ID:
          </Typography>
          <Input
            value={orgId}
            onChange={(e) => handleOnChange(e)}
          />
          <IconButton
            aria-label="done"
            onClick={() => handleSubmit()}
          >
            <DoneIcon />
          </IconButton>
        </ListItem>
      </List>
    </Dialog>
  );
};

MemberDetails.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    organization_id: PropTypes.string,
  }),
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

MemberDetails.defaultProps = {
  member: {},
  open: false,
  onClose: () => {},
};

export default MemberDetails;
