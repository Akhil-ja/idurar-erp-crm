import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { tagColor } from '@/utils/statusTagColor';

import { useMoney, useDate } from '@/settings';
import QueryDataTableModule from '@/modules/QueryModule/QueryDataTableModule';

export default function Query() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'query';
  const { moneyFormatter } = useMoney();

  const searchConfig = {
    entity: 'client', // Assuming queries are linked to clients
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['customer', 'description']; // Adjust based on Query model
  const dataTableColumns = [
    {
      title: translate('Customer'),
      dataIndex: ['customer', 'name'],
    },
    {
      title: translate('Description'),
      dataIndex: 'description',
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => {
        return <Tag color={tagColor(status)}>{status}</Tag>;
      },
    },
    {
      title: translate('Created Date'),
      dataIndex: 'createdAt',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
    {
      title: translate('Resolution'),
      dataIndex: 'resolution',
      render: (resolution) => {
        return resolution ? `${resolution.substring(0, 50)}...` : '';
      },
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Query'),
    DATATABLE_TITLE: translate('Query List'),
    ADD_NEW_ENTITY: translate('Add New Query'),
    ENTITY_NAME: translate('Query'),
  };

  const filterConfig = {
    status: [
      { value: 'Open', label: 'Open' },
      { value: 'InProgress', label: 'In Progress' },
      { value: 'Closed', label: 'Closed' },
    ],
  };

  const config = {
    entity,
    ...Labels,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
    filterConfig,
  };

  return <QueryDataTableModule config={config} />;
} // Added a comment to force refresh

  