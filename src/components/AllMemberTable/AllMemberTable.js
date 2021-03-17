import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditOutlined';
import swrFetch, { refetch } from '../../common/swrFetch';
import ErrorMessage from '../ErrorMessage';
import NotFoundMessage from '../NotFoundMessage';
import MemberDetails from './MemberDetails';

const AllMemberTable = () => {
  const memberData = swrFetch('/api/members');
  const organizationData = swrFetch('https://5fe220547a9487001768215e.mockapi.io/api/v1/organization');
  const [open, setOpen] = useState(false);
  const [stateMember, setMember] = useState(null);

  let content = <LinearProgress />;

  const toggleDialog = (chosenMember) => {
    setOpen(true);
    setMember(chosenMember);
  };

  const handleClose = () => {
    refetch('/api/members');
    setOpen(false);
  };

  if (memberData.isError || organizationData.isError) {
    content = <ErrorMessage />;
  } else if (!memberData.isLoading && !organizationData.isLoading) {
    console.log(memberData.data)
    const { memberList } = memberData.data;
    const organizationList = organizationData.data;

    memberList.forEach((member) => {
      member.companyName = 'None Found';
      for (let i = 0; i < organizationList.length; i++) {
        if (organizationList[i].id === member.organization_id.substring(member.organization_id.indexOf(' ') + 1)) {
          member.companyName = organizationList[i].name;
          member.existingClient = true;
          break;
        }
      }
    });
    content = (
      memberList.length > 0 ? (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> Name </TableCell>
                  <TableCell> Company Name </TableCell>
                  <TableCell> Company ID </TableCell>
                  <TableCell> Phone Number </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {memberList.map((member) => (
                  <TableRow
                    key={member.id}
                  >
                    <TableCell component="th" scope="row">
                      {member.name}
                    </TableCell>
                    <TableCell>{member.companyName}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => toggleDialog(member)}
                      >
                        <EditIcon />
                      </IconButton>
                      {member.organization_id}
                    </TableCell>
                    <TableCell>{member.phone_number}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {open ? (
            <MemberDetails
              open={open}
              member={stateMember}
              onClose={() => handleClose()}
            />
          ) : null }
        </>
      ) : <NotFoundMessage />
    );
  }
  return content;
};

export default AllMemberTable;
