import { type KeyboardEvent } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Button, InputWithIcon, Spinner } from '@shared/components';
import TEXTS from '@shared/i18n';
import { RoutesEnum } from '@/src/_app/types/RoutesEnum';
import { useDemoSearchState } from '../hooks/useDemoSearchState';
import { useGetDemoItemsList } from '../hooks/useGetDemoItemsList';
import { formatDemoDate } from '../utils/formatDemoDate';
import DemoDetailsDrawer from './DemoDetailsDrawer';
import {
  DemoCard,
  DemoCardMeta,
  DemoCardTitle,
  DemoHeader,
  DemoList,
  DemoPage,
  DemoTitle,
  DemoToolbar,
  EmptyState,
} from './styles/DemoScreen.styled';

export default function DemoScreen() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useDemoSearchState();
  const { items, isLoading } = useGetDemoItemsList(searchQuery.trim() || undefined);

  const handleOpenItem = (itemId: string) => {
    navigate(`${RoutesEnum.DEMO}/${itemId}`);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLLIElement>, itemId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpenItem(itemId);
    }
  };

  return (
    <DemoPage>
      <DemoHeader>
        <DemoTitle>{TEXTS.demo.listTitle}</DemoTitle>
        <Button onClick={() => navigate(RoutesEnum.DEMO_CREATE)}>
          <FiPlus aria-hidden="true" />
          {TEXTS.demo.newItem}
        </Button>
      </DemoHeader>

      <DemoToolbar>
        <InputWithIcon
          label={TEXTS.demo.searchLabel}
          placeholder={TEXTS.demo.searchPlaceholder}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          aria-label={TEXTS.demo.searchAriaLabel}
        />
      </DemoToolbar>

      {isLoading ? (
        <Spinner centered size={28} />
      ) : items.length === 0 ? (
        <EmptyState>{TEXTS.demo.emptyList}</EmptyState>
      ) : (
        <DemoList>
          {items.map((item) => (
            <DemoCard
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => handleOpenItem(item.id)}
              onKeyDown={(event) => handleCardKeyDown(event, item.id)}
              aria-label={item.title}
            >
              <DemoCardTitle>{item.title}</DemoCardTitle>
              <DemoCardMeta>
                <span>{item.authorName}</span>
                <span>{formatDemoDate(item.updatedAt)}</span>
              </DemoCardMeta>
            </DemoCard>
          ))}
        </DemoList>
      )}

      <DemoDetailsDrawer />
    </DemoPage>
  );
}
