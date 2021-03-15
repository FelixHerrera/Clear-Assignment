import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import MemberList from '../MemberList';
import ErrorMessage from '../../../ErrorMessage';
import * as swr from '../../../../common/swrFetch';

describe('MemberList component', () => {
  it('renders', () => {
    const wrapper = shallow(<MemberList />);
    expect(wrapper).toHaveLength(1);
  });

  it('should render an error message if swr returns an error', () => {
    swr.default = jest.fn().mockReturnValueOnce({
      data: undefined,
      isError: true,
      isLoading: false,
    });
    const wrapper = shallow(<MemberList />);
    const errorMessage = wrapper.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
  });

  it('should render the list of members if no error and data is returned', () => {
    swr.default = jest.fn().mockReturnValueOnce({
      data: [
        {
          id: '1',
          created_at: '2020-08-11T16:36:27.612Z',
          name: 'Destin Fahey',
          organization_id: 'organization_id 1',
          title: 'Officer',
          phone_number: '(840) 116-5157 x17522',
        },
      ],
      isError: false,
      isLoading: false,
    });
    const wrapper = shallow(<MemberList id="1" />);
    const memberNameWrapper = wrapper.find(Typography);
    expect(memberNameWrapper.text()).toEqual('Destin Fahey');
  });
});
