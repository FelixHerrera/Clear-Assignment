import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Header from '../Header';

describe('Header component', () => {
  it('renders', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toHaveLength(1);
  });
  it('should open the drawer when the menu button is clicked and not show a list when closed', () => {
    const wrapper = shallow(<Header />);
    const menuButtonWrapper = wrapper.find(IconButton);
    menuButtonWrapper.simulate('click');
    wrapper.update();
    expect(wrapper.find(List)).toHaveLength(1);
    wrapper.find(Drawer).simulate('close');
    wrapper.update();
    expect(wrapper.find(List).props().open).toBeFalsy();
  });
});
