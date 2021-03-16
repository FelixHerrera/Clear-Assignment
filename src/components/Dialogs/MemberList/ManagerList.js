import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ErrorMessage from '../../ErrorMessage';
import NotFoundMessage from '../../NotFoundMessage';
import swrFetch from '../../../common/swrFetch';

const ManagerList = () => {
  const memberData = swrFetch('https://5fe220547a9487001768215e.mockapi.io/api/v1/members');
  const organizationData = swrFetch('https://5fe220547a9487001768215e.mockapi.io/api/v1/organization');

  let content = <LinearProgress />;

  if (memberData.isError || organizationData.isError) {
    content = <ErrorMessage />;
  } else if (!memberData.isLoading && !organizationData.isLoading) {
    const managerList = memberData.data.filter((member) => member.title === 'Manager');
    managerList.forEach((manager) => {
      manager.existingClient = false;
      manager.companyName = 'None Found';
      for (let i = 0; i < organizationData.data.length; i++) {
        if (organizationData.data[i].id === manager.organization_id.substring(manager.organization_id.indexOf(' ') + 1)) {
          manager.companyName = organizationData.data[i].name;
          manager.existingClient = true;
          break;
        }
      }
    });
    content = (managerList.length > 0
      ? (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> Name </TableCell>
                  <TableCell> Company Name </TableCell>
                  <TableCell> Phone Number </TableCell>
                  <TableCell> Existing Client </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {managerList.map((manager) => (
                  <TableRow
                    key={manager.id}
                  >
                    <TableCell component="th" scope="row">
                      {manager.name}
                    </TableCell>
                    <TableCell>{manager.companyName}</TableCell>
                    <TableCell>{manager.phone_number}</TableCell>
                    <TableCell>{manager.existingClient.toString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : <NotFoundMessage />
    );
  }
  return content;
};

export default ManagerList;
