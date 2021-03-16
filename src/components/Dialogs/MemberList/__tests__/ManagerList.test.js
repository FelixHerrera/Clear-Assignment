import React from 'react';
import { shallow } from 'enzyme';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import ManagerList from '../ManagerList';
import ErrorMessage from '../../../ErrorMessage';
import NotFoundMessage from '../../../NotFoundMessage';
import * as swr from '../../../../common/swrFetch';

describe('ManagerList component', () => {
  it('renders', () => {
    const wrapper = shallow(<ManagerList />);
    expect(wrapper).toHaveLength(1);
  });

  it('should render an error message if swr returns an error', () => {
    swr.default = jest.fn().mockReturnValueOnce({
      data: undefined,
      isError: true,
      isLoading: false,
    });
    const wrapper = shallow(<ManagerList />);
    const errorMessage = wrapper.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
  });

  it('should render an loading bar if swr is loading', () => {
    swr.default = jest.fn().mockReturnValue({
      data: undefined,
      isError: false,
      isLoading: true,
    });
    const wrapper = shallow(<ManagerList />);
    const linearProgressWrapper = wrapper.find(LinearProgress);
    expect(linearProgressWrapper).toHaveLength(1);
  });

  it('should not render a list if no data is returned', () => {
    swr.default = jest.fn().mockReturnValue({
      data: [],
      isError: false,
      isLoading: false,
    });
    const wrapper = shallow(<ManagerList />);
    const notFoundWrapper = wrapper.find(NotFoundMessage);
    expect(notFoundWrapper).toHaveLength(1);
  });

  it('should not render a list of managers if no manager is found', () => {
    swr.default = jest.fn().mockReturnValueOnce({
      data: [],
      isError: false,
      isLoading: false,
    }).mockReturnValueOnce({
      data: [
        {
          id: '1',
          created_at: '2020-08-11T16:36:27.612Z',
          name: 'Destin Fahey',
          organization_id: 'organization_id 1',
          title: 'Officer',
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
      isError: false,
      isLoading: false,
    });
    const wrapper = shallow(<ManagerList />);
    const tableWrapper = wrapper.find(Table);
    expect(tableWrapper).toHaveLength(0);
  });

  it('should render a list of managers if a manager is found and show organization name if one is found', () => {
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
      data: [{
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
      isError: false,
      isLoading: false,
    });
    const wrapper = shallow(<ManagerList />);
    const memberNameWrapper = wrapper.find(TableCell).at(4);
    const organizationNameWrapper = wrapper.find(TableCell).at(5);
    expect(memberNameWrapper.text()).toEqual('Destin Fahey');
    expect(organizationNameWrapper.text()).toEqual('Schulist - Lind');
  });

  it('should render a list of managers if a manager is found', () => {
    swr.default = jest.fn().mockReturnValue({
      data: [],
      isError: false,
      isLoading: false,
    }).mockReturnValueOnce({
      data: [{
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
      isError: false,
      isLoading: false,
    });
    const wrapper = shallow(<ManagerList />);
    const nameWrapper = wrapper.find(TableCell).at(4);
    expect(nameWrapper.text()).toEqual('Destin Fahey');
  });

  it('should render a list of managers if a manager is found and None Found if no org name is found', () => {
    swr.default = jest.fn().mockReturnValue({
      data: [],
      isError: false,
      isLoading: false,
    }).mockReturnValueOnce({
      data: [{
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
      isError: false,
      isLoading: false,
    });
    const wrapper = shallow(<ManagerList />);
    const memberNameWrapper = wrapper.find(TableCell).at(4);
    const organizationNameWrapper = wrapper.find(TableCell).at(5);
    expect(memberNameWrapper.text()).toEqual('Destin Fahey');
    expect(organizationNameWrapper.text()).toEqual('None Found');
  });
});
