import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Button, Input, Spinner, Textarea } from '@shared/components';
import TEXTS from '@shared/i18n';
import { RoutesEnum } from '@/src/_app/types/RoutesEnum';
import { useCreateDemoItem } from '../hooks/useCreateDemoItem';
import { useDemoItemDetails } from '../hooks/useDemoItemDetails';
import { useUpdateDemoItem } from '../hooks/useUpdateDemoItem';
import {
  FormActions,
  FormCard,
  FormError,
  FormFields,
  FormHeader,
  FormPage,
  FormTitle,
} from './styles/DemoForm.styled';

export default function DemoFormScreen() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { item, isLoading } = useDemoItemDetails(isEdit ? id! : null);
  const { createDemoItem, isCreating } = useCreateDemoItem();
  const { updateDemoItem, isUpdating } = useUpdateDemoItem();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isSaving = isCreating || isUpdating;

  useEffect(() => {
    if (!item) {
      return;
    }
    setTitle(item.title);
    setDescription(item.description);
  }, [item]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      return;
    }

    setError(null);

    const payload = {
      title: title.trim(),
      description: description.trim(),
    };

    try {
      if (isEdit && id) {
        await updateDemoItem({ id, payload });
        navigate(`${RoutesEnum.DEMO}/${id}`);
      } else {
        await createDemoItem(payload);
        navigate(RoutesEnum.DEMO);
      }
    } catch {
      setError(TEXTS.demo.errors.saveFailed);
    }
  };

  const handleCancel = () => {
    navigate(isEdit && id ? `${RoutesEnum.DEMO}/${id}` : RoutesEnum.DEMO);
  };

  if (isEdit && isLoading) {
    return (
      <FormPage>
        <Spinner centered size={28} />
      </FormPage>
    );
  }

  return (
    <FormPage>
      <FormHeader>
        <Breadcrumb
          items={[
            { label: TEXTS.common.home, to: RoutesEnum.HOME },
            { label: TEXTS.demo.listTitle, to: RoutesEnum.DEMO },
            { label: isEdit ? TEXTS.demo.editTitle : TEXTS.demo.createTitle },
          ]}
        />
        <FormTitle>{isEdit ? TEXTS.demo.editTitle : TEXTS.demo.createTitle}</FormTitle>
      </FormHeader>

      <FormCard onSubmit={handleSubmit}>
        <FormFields>
          <Input
            label={TEXTS.demo.fields.title}
            placeholder={TEXTS.demo.placeholders.title}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <Textarea
            label={TEXTS.demo.fields.description}
            placeholder={TEXTS.demo.placeholders.description}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
          {error && <FormError role="alert">{error}</FormError>}
        </FormFields>

        <FormActions>
          <Button type="button" variant="secondary" onClick={handleCancel}>
            {TEXTS.common.cancel}
          </Button>
          <Button type="submit" isLoading={isSaving}>
            {TEXTS.common.save}
          </Button>
        </FormActions>
      </FormCard>
    </FormPage>
  );
}
