import Grid from '@material-ui/core/Grid';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Header from '../src/components/Header/Header';
import AllMemberTable from '../src/components/AllMemberTable/AllMemberTable';
import ManagerList from '../src/components/Dialogs/MemberList/ManagerList';
import OrganizationsTable from '../src/components/OrganizationsTable/OrganizationsTable';

export default function Home() {
  return (
    <>
      <Header name="Dashboard" />
      <Grid container justify="center" spacing={4} style={{ paddingTop: 10 }}>
        <Grid item xs={6}>
          <Paper style={{ textAlign: 'center' }}>
            <h2>All Organizations</h2>
            <OrganizationsTable />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ textAlign: 'center' }}>
            <h2>Manager List</h2>
            <ManagerList />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ textAlign: 'center' }}>
            <h2>All Members</h2>
            <AllMemberTable />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
