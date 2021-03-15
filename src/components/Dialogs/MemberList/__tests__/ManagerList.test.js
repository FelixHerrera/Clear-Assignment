import React from 'react';
import { shallow } from 'enzyme';
import ManagerList from '../ManagerList';

describe('ManagerList component', () => {
  it('renders', () => {
    const wrapper = shallow(<ManagerList />);
    expect(wrapper).toHaveLength(1);
  });
});
