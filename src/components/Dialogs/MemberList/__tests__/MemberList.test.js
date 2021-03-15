import React from 'react';
import { shallow } from 'enzyme';
import MemberList from '../MemberList';

describe('MemberList component', () => {
  it('renders', () => {
    const wrapper = shallow(<MemberList />);
    expect(wrapper).toHaveLength(1);
  });
});
