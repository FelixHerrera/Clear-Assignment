import React from 'react';
import ButtonAppBar from '../src/components/Header/Header';
import OrganizationsTable from '../src/components/OrganizationsTable/OrganizationsTable';

const organizations = () => (
  <>
    <ButtonAppBar name="Organizations" />
    <OrganizationsTable />
  </>
);

export default organizations;
