import useLanguage from '@/locale/useLanguage';
import CreateQueryModule from '@/modules/QueryModule/CreateQueryModule';

export default function QueryCreate() {
  const entity = 'query';
  const translate = useLanguage();
  const Labels = {
    PANEL_TITLE: translate('Query'),
    DATATABLE_TITLE: translate('Query List'),
    ADD_NEW_ENTITY: translate('Add New Query'),
    ENTITY_NAME: translate('Query'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <CreateQueryModule config={configPage} />;
}
