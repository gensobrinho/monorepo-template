import type { SetCallback } from '../../../shared/store';

export interface IDemoInitialState {
  searchQuery: string;
  selectedDemoItemId: string | null;
}

export const initialState: IDemoInitialState = {
  searchQuery: '',
  selectedDemoItemId: null,
};

const actions = (set: SetCallback<IDemoInitialState>) => ({
  setSearchQuery: (searchQuery: string) => set((state) => {
    state.searchQuery = searchQuery;
  }),
  setSelectedDemoItemId: (selectedDemoItemId: string | null) => set((state) => {
    state.selectedDemoItemId = selectedDemoItemId;
  }),
  resetDemoSlice: () => set(initialState),
});

export const slice = (set: SetCallback<IDemoInitialState>) => ({
  ...initialState,
  ...actions(set),
});

export type IDemoActions = ReturnType<typeof actions>;

export default { slice, initialState };
