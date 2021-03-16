import React from 'react';
import { shallow, mount } from 'enzyme';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import OrganizationsTable from '../OrganizationsTable';
import ErrorMessage from '../../ErrorMessage';
import NotFoundMessage from '../../NotFoundMessage';
import * as swr from '../../../common/swrFetch';
import ClientDialog from '../../Dialogs/ClientDialog';

describe('OrganizationsTable component', () => {
  it('renders', () => {
    const wrapper = shallow(<OrganizationsTable />);
    expect(wrapper).toHaveLength(1);
  });

  it('should show an error when an error occurs loading data', () => {
    swr.default = jest.fn().mockReturnValueOnce({
      isError: true,
      isLoading: false,
      data: [],
    });
    const wrapper = shallow(<OrganizationsTable />);
    const errorWrapper = wrapper.find(ErrorMessage);
    expect(errorWrapper).toHaveLength(1);
  });

  it('should show an loading indicator when data is loading', () => {
    swr.default = jest.fn().mockReturnValueOnce({
      isError: false,
      isLoading: true,
      data: [],
    });
    const wrapper = shallow(<OrganizationsTable />);
    const loadingWrapper = wrapper.find(LinearProgress);
    expect(loadingWrapper).toHaveLength(1);
  });

  it('should show not found if no data is returned', () => {
    swr.default = jest.fn().mockReturnValueOnce({
      isError: false,
      isLoading: false,
      data: [],
    });
    const wrapper = shallow(<OrganizationsTable />);
    const notFoundWrapper = wrapper.find(NotFoundMessage);
    expect(notFoundWrapper).toHaveLength(1);
  });

  it('should open dialog component when a row is clicked', () => {
    swr.default = jest.fn().mockReturnValue({
      isError: false,
      isLoading: false,
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
      },
      {
        id: '2',
        created_at: '2020-06-30T14:46:33.209Z',
        name: 'Dach, Koepp and Torphy',
        headcount: 69,
        is_public: true,
        address_1: '6982 Garret Burgs',
        city: 'New George',
        zip_code: '66036',
        state: 'ME',
      }],
    });
    const wrapper = mount(
      <MuiThemeProvider>
        <OrganizationsTable />
      </MuiThemeProvider>,
    );

    wrapper.find(TableRow).at(1).simulate('click');
    const clientWrapper = wrapper.find(ClientDialog);
    expect(clientWrapper).toHaveLength(1);
  });

  it('should not render dialog component after it is closed', async () => {
    swr.default = jest.fn().mockReturnValue({
      isError: false,
      isLoading: false,
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
      },
      {
        id: '2',
        created_at: '2020-06-30T14:46:33.209Z',
        name: 'Dach, Koepp and Torphy',
        headcount: 69,
        is_public: true,
        address_1: '6982 Garret Burgs',
        city: 'New George',
        zip_code: '66036',
        state: 'ME',
      }],
    }).mockReturnValue({
      isError: false,
      isLoading: false,
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
      },
      {
        id: '2',
        created_at: '2020-06-30T14:46:33.209Z',
        name: 'Dach, Koepp and Torphy',
        headcount: 69,
        is_public: true,
        address_1: '6982 Garret Burgs',
        city: 'New George',
        zip_code: '66036',
        state: 'ME',
      }],
    });
    const wrapper = shallow(
      <OrganizationsTable />,
    );

    wrapper.find(TableRow).at(1).simulate('click');
    const clientWrapper = wrapper.find(ClientDialog);
    clientWrapper.props().onClose();
    wrapper.update();
    expect(wrapper.find(ClientDialog)).toHaveLength(0);
  });
});
