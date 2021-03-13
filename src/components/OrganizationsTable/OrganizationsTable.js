import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';

const OrganizationsTable = ({ organizations }) => (
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
        {organizations.map((organization) => (
          <TableRow key={organization.id}>
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
);

OrganizationsTable.propTypes = {
  organizations: PropTypes.instanceOf(Array),
};

OrganizationsTable.defaultProps = {
  organizations: [],
};

export default OrganizationsTable;
