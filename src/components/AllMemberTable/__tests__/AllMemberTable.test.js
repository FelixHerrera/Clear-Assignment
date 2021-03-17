import React from 'react';
import { shallow } from 'enzyme';
import LinearProgress from '@material-ui/core/LinearProgress';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import AllMemberTable from '../AllMemberTable';
import NotFoundMessage from '../../NotFoundMessage';
import * as swr from '../../../common/swrFetch';
import ErrorMessage from '../../ErrorMessage';
import MemberDetails from '../MemberDetails';

describe('AllMemberDetails component', () => {
  it('renders', () => {
    const wrapper = shallow(<AllMemberTable />);
    expect(wrapper).toHaveLength(1);
  });

  it('should render an loading bar if swr is loading', () => {
    swr.default = jest.fn().mockReturnValue({
      data: undefined,
      isError: false,
      isLoading: true,
    });
    const wrapper = shallow(<AllMemberTable />);
    const linearProgressWrapper = wrapper.find(LinearProgress);
    expect(linearProgressWrapper).toHaveLength(1);
  });

  it('should not render a list if no data is returned', () => {
    swr.default = jest.fn().mockReturnValue({
      data: { memberList: [] },
      isError: false,
      isLoading: false,
    });
    const wrapper = shallow(<AllMemberTable />);
    const notFoundWrapper = wrapper.find(NotFoundMessage);
    expect(notFoundWrapper).toHaveLength(1);
  });

  it('should render an error message if swr returns an error', () => {
    swr.default = jest.fn().mockReturnValueOnce({
      data: undefined,
      isError: true,
      isLoading: false,
    });
    const wrapper = shallow(<AllMemberTable />);
    const errorMessage = wrapper.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
  });

  it('should render a list of members if a member is found and show organization name if one is found', () => {
    swr.default = jest.fn().mockReturnValue({
      data: [{
        id: '1',
        created_at: '2020-10-06T20:33:33.956Z',
        name: 'Schulist - Lind',
        headcount: 69,
        is_public: false,
        address_1: '714 Josefa Inlet',
        city: 'South Brendabury',
        zip_code: '69722-8987',
        state: 'MS',
      }],
      isError: false,
      isLoading: false,
    }).mockReturnValueOnce({
      data: {
        memberList: [{
          id: '1',
          created_at: '2020-08-11T16:36:27.612Z',
          name: 'Destin Fahey',
          organization_id: 'organization_id 1',
          title: 'Manager',
          phone_number: '(840) 116-5157 x17522',
        },
        {
          id: '2',
          created_at: '2020-03-09T03:38:36.139Z',
          name: 'Miss Laverne Effertz',
          organization_id: 'organization_id 2',
          title: 'Executive',
          phone_number: '941-079-5733 x931',
        },
        ],
      },
      isError: false,
      isLoading: false,
    });
    const wrapper = shallow(<AllMemberTable />);
    const memberNameWrapper = wrapper.find(TableCell).at(4);
    const organizationNameWrapper = wrapper.find(TableCell).at(5);
    expect(memberNameWrapper.text()).toEqual('Destin Fahey');
    expect(organizationNameWrapper.text()).toEqual('Schulist - Lind');
  });
  it('should render a memberdetails component if the edit button is clicked', () => {
    swr.default = jest.fn().mockReturnValue({
      data: [{
        id: '1',
        created_at: '2020-10-06T20:33:33.956Z',
        name: 'Schulist - Lind',
        headcount: 69,
        is_public: false,
        address_1: '714 Josefa Inlet',
        city: 'South Brendabury',
        zip_code: '69722-8987',
        state: 'MS',
      }],
      isError: false,
      isLoading: false,
    }).mockReturnValue({
      data: {
        memberList: [{
          id: '1',
          created_at: '2020-08-11T16:36:27.612Z',
          name: 'Destin Fahey',
          organization_id: 'organization_id 1',
          title: 'Manager',
          phone_number: '(840) 116-5157 x17522',
        },
        ],
      },
      isError: false,
      isLoading: false,
    });
    const wrapper = shallow(<AllMemberTable />);
    const iconButtonWrapper = wrapper.find(IconButton);
    iconButtonWrapper.simulate('click');
    wrapper.update();
    expect(wrapper.find(MemberDetails)).toHaveLength(1);
  });
  it('should not have a dialog open after onclose is called', () => {
    swr.default = jest.fn().mockReturnValue({
      data: [{
        id: '1',
        created_at: '2020-10-06T20:33:33.956Z',
        name: 'Schulist - Lind',
        headcount: 69,
        is_public: false,
        address_1: '714 Josefa Inlet',
        city: 'South Brendabury',
        zip_code: '69722-8987',
        state: 'MS',
      }],
      isError: false,
      isLoading: false,
    }).mockReturnValue({
      data: {
        memberList: [{
          id: '1',
          created_at: '2020-08-11T16:36:27.612Z',
          name: 'Destin Fahey',
          organization_id: 'organization_id 1',
          title: 'Manager',
          phone_number: '(840) 116-5157 x17522',
        },
        ],
      },
      isError: false,
      isLoading: false,
    });
    const wrapper = shallow(<AllMemberTable />);
    const iconButtonWrapper = wrapper.find(IconButton);
    iconButtonWrapper.simulate('click');
    wrapper.update();
    wrapper.find(MemberDetails).simulate('close');
    expect(wrapper.find(MemberDetails)).toHaveLength(0);
  });
});
