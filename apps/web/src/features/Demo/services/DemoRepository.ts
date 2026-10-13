import { DEMO_API, DemoApi } from '@shared/api';
import { BaseRepository } from '../../../shared/utils/BaseRepository';
import type {
  IDemoRepository,
  TCreateDemoItemPayload,
  TGetDemoItemsParams,
  TPaginatedDemoItems,
  TUpdateDemoItemPayload,
} from '../types/IDemoRepository';
import type { TDemoItem } from '../types/TDemoItem';

export class DemoRepository extends BaseRepository implements IDemoRepository {
  private readonly api: DemoApi;

  constructor(api: DemoApi) {
    super();
    this.api = api;
  }

  async getDemoItems(params: TGetDemoItemsParams): Promise<TPaginatedDemoItems> {
    const url = this.addQueryParams(DEMO_API.ENTRY_POINTS.GET_ITEMS, {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      search: params.search || undefined,
      authorId: params.authorId,
    });
    const response = await this.api.get<TPaginatedDemoItems>(url);
    return response.data;
  }

  async getDemoItemById(id: string): Promise<TDemoItem> {
    const response = await this.api.get<TDemoItem>(
      `${DEMO_API.ENTRY_POINTS.GET_ITEMS}/${id}`,
    );
    return response.data;
  }

  async createDemoItem(payload: TCreateDemoItemPayload): Promise<TDemoItem> {
    const response = await this.api.post<TDemoItem>(
      DEMO_API.ENTRY_POINTS.CREATE_ITEM,
      payload,
    );
    return response.data;
  }

  async updateDemoItem(id: string, payload: TUpdateDemoItemPayload): Promise<TDemoItem> {
    const response = await this.api.put<TDemoItem>(
      `${DEMO_API.ENTRY_POINTS.UPDATE_ITEM}/${id}`,
      payload,
    );
    return response.data;
  }

  async deleteDemoItem(id: string): Promise<void> {
    await this.api.delete(`${DEMO_API.ENTRY_POINTS.DELETE_ITEM}/${id}`);
  }
}
