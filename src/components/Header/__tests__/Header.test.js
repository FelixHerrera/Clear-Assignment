import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

describe('Header component', () => {
  it('renders', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toHaveLength(1);
  });
});
