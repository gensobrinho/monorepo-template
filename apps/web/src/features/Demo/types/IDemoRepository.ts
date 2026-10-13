import type { TDemoItem } from './TDemoItem';

export type TGetDemoItemsParams = {
  search?: string;
  page?: number;
  limit?: number;
  authorId?: string;
};

export type TPaginatedDemoItems = {
  data: TDemoItem[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
};

export type TCreateDemoItemPayload = {
  title: string;
  description: string;
};

export type TUpdateDemoItemPayload = {
  title: string;
  description: string;
};

export interface IDemoRepository {
  getDemoItems(params: TGetDemoItemsParams): Promise<TPaginatedDemoItems>;
  getDemoItemById(id: string): Promise<TDemoItem>;
  createDemoItem(payload: TCreateDemoItemPayload): Promise<TDemoItem>;
  updateDemoItem(id: string, payload: TUpdateDemoItemPayload): Promise<TDemoItem>;
  deleteDemoItem(id: string): Promise<void>;
}
