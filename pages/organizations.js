import React from 'react';
import ButtonAppBar from '../src/components/Header/Header';
import OrganizationsTable from '../src/components/OrganizationsTable/OrganizationsTable';

const organizations = ({data}) => (
  <>
    <ButtonAppBar name="Organizations" />
    <OrganizationsTable organizations={data} />
  </>
);

export const getServerSideProps = async (context) => {
const res = await fetch('https://5fe220547a9487001768215e.mockapi.io/api/v1/organization');
const data = await res.json();

if (!data) {
  return {
    notFound: true,
  };
}

return {
  props: {
    data,
  }, // will be passed to the page component as props
};
};


export default organizations;
