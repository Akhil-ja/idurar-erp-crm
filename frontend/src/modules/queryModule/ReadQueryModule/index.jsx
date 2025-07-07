import NotFound from '@/components/NotFound';
import { ErpLayout } from '@/layout';
import ReadQueryItem from '@/modules/QueryModule/ReadQueryItem';
import QueryNotes from '@/modules/QueryModule/QueryNotes';

import PageLoader from '@/components/PageLoader';
import { erp } from '@/redux/erp/actions';
import { selectReadItem } from '@/redux/erp/selectors';
import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

export default function ReadQueryModule({ config }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [notes, setNotes] = useState([]);

  useLayoutEffect(() => {
    dispatch(erp.read({ entity: config.entity, id }));
  }, [id]);

  const { result: currentResult, isSuccess, isLoading = true } = useSelector(selectReadItem);

  useLayoutEffect(() => {
    if (currentResult && currentResult.notes) {
      setNotes(currentResult.notes);
    }
  }, [currentResult]);

  const handleNoteAdded = (newNotes) => {
    setNotes(newNotes);
  };

  const handleNoteRemoved = (newNotes) => {
    setNotes(newNotes);
  };

  if (isLoading) {
    return (
      <ErpLayout>
        <PageLoader />
      </ErpLayout>
    );
  } else
    return (
      <ErpLayout>
        {isSuccess ? (
          <>
            <ReadQueryItem config={config} selectedItem={currentResult} />
            <QueryNotes queryId={id} notes={notes} onNoteAdded={handleNoteAdded} onNoteRemoved={handleNoteRemoved} />
          </>
        ) : (
          <NotFound entity={config.entity} />
        )}
      </ErpLayout>
    );
}
