import React from 'react';
import AllMemberTable from '../src/components/AllMemberTable/AllMemberTable';
import ButtonAppBar from '../src/components/Header/Header';

const organizations = () => (
  <>
    <ButtonAppBar name="Members" />
    <AllMemberTable />
  </>
);

export default organizations;
