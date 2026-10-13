import { useSliceSetter, useSliceState } from '@shared/hooks';
import type { IDemoActions, IDemoInitialState } from '../sliceStore/demoSliceStore';

export function useDemoSearchState() {
  const searchQuery = useSliceState<IDemoInitialState, 'searchQuery'>('searchQuery');
  const setSearchQuery = useSliceSetter<IDemoActions, 'setSearchQuery'>('setSearchQuery');
  return { searchQuery, setSearchQuery };
}
