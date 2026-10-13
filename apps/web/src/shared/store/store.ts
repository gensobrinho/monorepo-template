import { authSlice } from '@/src/features/Auth';
import type { IAuthActions, IAuthInitialState } from '@/src/features/Auth';
import { demoSlice } from '@/src/features/Demo';
import type { IDemoActions, IDemoInitialState } from '@/src/features/Demo';
import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

export type SetCallback<T> = (
  nextStateOrUpdater: ((state: T) => void) | T,
  shouldReplace?: false,
) => void;

export type TGlobalInitialState = IAuthInitialState & IDemoInitialState;
export type TGlobalActions = IAuthActions & IDemoActions;
export type Store = TGlobalInitialState & TGlobalActions;

export const slices = {
  authSlice: authSlice.slice,
  demoSlice: demoSlice.slice,
};

export const vanillaStore = createStore(
  immer<Store>((set) => ({
    ...authSlice.slice(set as SetCallback<IAuthInitialState>),
    ...demoSlice.slice(set as SetCallback<IDemoInitialState>),
  })),
);
