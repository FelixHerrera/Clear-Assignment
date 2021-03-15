import React from 'react';
import Header from '../../src/components/Header/Header';
import ManagerList from '../../src/components/Dialogs/MemberList/ManagerList';

const managers = () => (
  <>
    <Header name="Managers" />
    <ManagerList />
  </>
);

export default managers;
