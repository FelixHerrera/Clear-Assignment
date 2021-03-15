import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import swrFetch from '../../common/swrFetch';
import ClientDialog from '../Dialogs/ClientDialog';
import ErrorMessage from '../ErrorMessage';

const OrganizationsTable = () => {
  const { data, isLoading, isError } = swrFetch('https://5fe220547a9487001768215e.mockapi.io/api/v1/organization');
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const handleOnClick = (isOpen, clickedId) => {
    setOpen(isOpen);
    setId(clickedId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let content = <LinearProgress />;
  if (isError) {
    content = <ErrorMessage />;
  } else if (!isLoading) {
    content = (
      <>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> Name </TableCell>
                <TableCell> Public/Private </TableCell>
                <TableCell> Headcount </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((organization) => (
                <TableRow
                  key={organization.id}
                  onClick={() => handleOnClick(true, organization.id)}
                >
                  <TableCell component="th" scope="row">
                    {organization.name}
                  </TableCell>
                  <TableCell>{organization.is_public ? 'Public' : 'Private'}</TableCell>
                  <TableCell>{organization.headcount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {open ? <ClientDialog open={open} id={id} onClose={() => handleClose()} /> : null }
      </>
    );
  }
  return content;
};

export default OrganizationsTable;
