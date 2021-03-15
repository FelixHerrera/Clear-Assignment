import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import ErrorMessage from '../../ErrorMessage';
import NotFoundMessage from '../../NotFoundMessage';
import swrFetch from '../../../common/swrFetch';

const MemberList = ({ id }) => {
  const { data, isError, isLoading } = swrFetch('https://5fe220547a9487001768215e.mockapi.io/api/v1/members');

  let content = <LinearProgress />;

  if (isError) {
    content = <ErrorMessage />;
  } else if (!isLoading) {
    const memberData = data.filter((member) => {
      const orgId = member.organization_id;
      return orgId.substring(orgId.indexOf(' ') + 1) === id;
    });
    content = (
      memberData.length > 0
        ? (
          <>
            <ListSubheader component="div" id="nested-list-subheader">
              Members
            </ListSubheader>
            <List>
              {memberData.map((member) => (
                <ListItem key={member.id}>
                  <Typography>
                    {member.name}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </>
        ) : (<NotFoundMessage />)

    );
  }
  return content;
};

export default MemberList;
