import React from 'react';
import { shallow } from 'enzyme';
import NotFoundMessage from '../NotFoundMessage';

describe('ErrorMessage component', () => {
  it('renders', () => {
    const wrapper = shallow(<NotFoundMessage />);
    expect(wrapper).toHaveLength(1);
  });
});
