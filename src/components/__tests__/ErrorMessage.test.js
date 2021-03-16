import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage component', () => {
  it('renders', () => {
    const wrapper = shallow(<ErrorMessage />);
    expect(wrapper).toHaveLength(1);
  });
});
