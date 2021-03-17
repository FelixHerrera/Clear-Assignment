import React from 'react';
import { shallow, mount } from 'enzyme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Input from '@material-ui/core/Input';
import AllMemberTable from '../AllMemberTable';

describe('AllMemberDetails component', () => {
  it('renders', () => {
    const wrapper = shallow(<AllMemberTable />);
    expect(wrapper).toHaveLength(1);
  });
});
