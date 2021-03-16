import React from 'react';
import { shallow } from 'enzyme';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItem from '@material-ui/core/ListItem';
import ClientDialog from '../ClientDialog';
import ErrorMessage from '../../ErrorMessage';
import * as swr from '../../../common/swrFetch';
import MemberList from '../MemberList/MemberList';
import NotFoundMessage from '../../NotFoundMessage';
import Dialog from '@material-ui/core/Dialog';

describe('ClientDialog component', () => {
  it('renders', () => {
    const wrapper = shallow(<ClientDialog />);
    expect(wrapper).toHaveLength(1);
  });

  it('should render an error message if swr returns an error', () => {
    swr.default = jest.fn().mockReturnValueOnce({
      data: undefined,
      isError: true,
      isLoading: false,
    });
    const wrapper = shallow(<ClientDialog />);
    const errorMessage = wrapper.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
  });

  it('should render an loading bar if swr is loading', () => {
    swr.default = jest.fn().mockReturnValueOnce({
      data: undefined,
      isError: false,
      isLoading: true,
    });
    const wrapper = shallow(<ClientDialog />);
    const linearProgressWrapper = wrapper.find(LinearProgress);
    expect(linearProgressWrapper).toHaveLength(1);
  });

  it('should render information about the company if found', () => {
    swr.default = jest.fn().mockReturnValueOnce({
      data: {
        id: '1',
        created_at: '2020-10-06T20:33:33.956Z',
        name: 'Schulist - Lind',
        headcount: 69,
        is_public: false,
        address_1: '714 Josefa Inlet',
        city: 'South Brendabury',
        zip_code: '69722-8987',
        state: 'MS',
      },
      isError: false,
      isLoading: false,
    });
    const wrapper = shallow(<ClientDialog id="1" />);
    const listItemWrapper = wrapper.find(ListItem);
    const memberListWrapper = wrapper.find(MemberList);
    expect(listItemWrapper).toHaveLength(7);
    expect(memberListWrapper).toHaveLength(1);
  });

  it('The dialog should call the close prop function when on close is triggered', () => {
    swr.default = jest.fn().mockReturnValueOnce({
      data: {
        id: '1',
        created_at: '2020-10-06T20:33:33.956Z',
        name: 'Schulist - Lind',
        headcount: 69,
        is_public: true,
        address_1: '714 Josefa Inlet',
        city: 'South Brendabury',
        zip_code: '69722-8987',
        state: 'MS',
      },
      isError: false,
      isLoading: false,
    });
    const onCloseMock = jest.fn();
    const wrapper = shallow(<ClientDialog id="1" open onClose={onCloseMock} />);
    wrapper.find(Dialog).simulate('close');
    expect(onCloseMock).toBeCalled();
  });

  it('should render not found if the company is not found', () => {
    swr.default = jest.fn().mockReturnValueOnce({
      data: {},
      isError: false,
      isLoading: false,
    });
    const wrapper = shallow(<ClientDialog id="1" />);
    const notfoundWrapper = wrapper.find(NotFoundMessage);
    expect(notfoundWrapper).toHaveLength(1);
  });
});
