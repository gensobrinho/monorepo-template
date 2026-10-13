import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Dialog, Drawer, Spinner } from '@shared/components';
import TEXTS from '@shared/i18n';
import { getInitials } from '@/src/shared/utils/helperFunctions';
import { RoutesEnum } from '@/src/_app/types/RoutesEnum';
import { useDeleteDemoItem } from '../hooks/useDeleteDemoItem';
import { useDemoItemDetails } from '../hooks/useDemoItemDetails';
import { formatDemoDate } from '../utils/formatDemoDate';
import {
  DetailsActions,
  DetailsAuthor,
  DetailsDescription,
  DetailsField,
  DetailsFieldLabel,
  DetailsTitleValue,
} from './styles/DemoDetailsDrawer.styled';

export default function DemoDetailsDrawer() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { item, isLoading } = useDemoItemDetails(id ?? null);
  const { deleteDemoItem, isDeleting } = useDeleteDemoItem();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    navigate(RoutesEnum.DEMO);
  };

  const handleEdit = () => {
    if (!id) {
      return;
    }
    navigate(RoutesEnum.DEMO_EDIT.replace(':id', id));
  };

  const handleConfirmDelete = async () => {
    if (!id) {
      return;
    }

    setError(null);
    try {
      await deleteDemoItem(id);
      setConfirmDelete(false);
      handleClose();
    } catch {
      setError(TEXTS.demo.errors.deleteFailed);
    }
  };

  return (
    <>
      <Drawer
        open={Boolean(id)}
        onClose={handleClose}
        title={TEXTS.demo.detailsTitle}
        closeAriaLabel={TEXTS.demo.closeDetails}
        footer={(
          <DetailsActions>
            <Button variant="secondary" type="button" onClick={handleEdit}>
              <FiEdit2 aria-hidden="true" />
              {TEXTS.common.edit}
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={() => {
                setError(null);
                setConfirmDelete(true);
              }}
            >
              <FiTrash2 aria-hidden="true" />
              {TEXTS.common.delete}
            </Button>
          </DetailsActions>
        )}
      >
        {isLoading || !item ? (
          <Spinner centered size={24} />
        ) : (
          <>
            <DetailsField>
              <DetailsFieldLabel>{TEXTS.demo.fields.title}</DetailsFieldLabel>
              <DetailsTitleValue>{item.title}</DetailsTitleValue>
            </DetailsField>

            <DetailsField>
              <DetailsFieldLabel>{TEXTS.demo.fields.author}</DetailsFieldLabel>
              <DetailsAuthor>
                <span aria-hidden="true">{getInitials(item.authorName)}</span>
                <span>{item.authorName}</span>
              </DetailsAuthor>
            </DetailsField>

            <DetailsField>
              <DetailsFieldLabel>{TEXTS.demo.fields.updatedAt}</DetailsFieldLabel>
              <span>{formatDemoDate(item.updatedAt)}</span>
            </DetailsField>

            <DetailsField>
              <DetailsFieldLabel>{TEXTS.demo.fields.description}</DetailsFieldLabel>
              <DetailsDescription>{item.description}</DetailsDescription>
            </DetailsField>

            {error && <p role="alert">{error}</p>}
          </>
        )}
      </Drawer>

      <Dialog
        open={confirmDelete}
        onClose={() => !isDeleting && setConfirmDelete(false)}
        title={TEXTS.demo.deleteDialog.title}
        description={TEXTS.demo.deleteDialog.description}
        hasCloseButton
        primaryButtonLabel={TEXTS.common.delete}
        secondaryButtonLabel={TEXTS.common.cancel}
        primaryButtonVariant="danger"
        primaryButtonAction={() => {
          void handleConfirmDelete();
        }}
        isPrimaryLoading={isDeleting}
        disableCloseOnBackdrop={isDeleting}
      />
    </>
  );
}
