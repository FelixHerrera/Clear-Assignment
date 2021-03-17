import React from 'react';
import { shallow, mount } from 'enzyme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import MemberDetails from '../MemberDetails';

describe('ClientDialog component', () => {
  const mockMember = {
    id: '1',
    name: 'test',
    organization_id: 'organization_id 1',
  };
  it('renders', () => {
    const wrapper = shallow(<MemberDetails />);
    expect(wrapper).toHaveLength(1);
  });

  it('should render an input for editing', () => {
    const wrapper = shallow(
      <MemberDetails member={mockMember} open onClose={jest.fn()} />,
    );
    const inputWrapper = wrapper.find(Input);
    expect(inputWrapper).toHaveLength(1);
  });

  it('should submit when icon button is clicked', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
    }));
    const wrapper = shallow(
      <MemberDetails member={mockMember} open onClose={jest.fn()} />,
    );
    const buttonWrapper = wrapper.find(IconButton);
    buttonWrapper.simulate('click');
    expect(fetch).toBeCalled();
  });

  it('should submit when icon button is clicked', () => {
    const onCloseMock = jest.fn();
    const wrapper = shallow(
      <MemberDetails member={mockMember} open onClose={onCloseMock} />,
    );

    const clientWrapper = wrapper.find(Dialog);
    clientWrapper.simulate('close');
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('updates state on change', () => {
    const wrapper = shallow(
      <MemberDetails member={mockMember} open onClose={jest.fn()} />,
    );
    const input = wrapper.find(Input);
    input.simulate('change', { target: { value: 'Organization_id 2' } }); // 'value' instead of 'num'
    wrapper.update();
    expect(wrapper.find(Input).props().value).toEqual('Organization_id 2'); // SUCCESS
  });
});
