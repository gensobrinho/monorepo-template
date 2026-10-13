import { getApiErrorBody } from '../../../shared/api/apiError';
import TEXTS from '@shared/i18n';
import type {
  IDemoRepository,
  TCreateDemoItemPayload,
  TGetDemoItemsParams,
  TPaginatedDemoItems,
  TUpdateDemoItemPayload,
} from '../types/IDemoRepository';
import type { TDemoItem } from '../types/TDemoItem';

export class DemoManager {
  constructor(private readonly repository: IDemoRepository) {}

  getDemoItems(params: TGetDemoItemsParams): Promise<TPaginatedDemoItems> {
    return this.repository.getDemoItems({
      ...params,
      page: params.page ?? 1,
      limit: params.limit ?? 10,
    });
  }

  getDemoItemById(id: string): Promise<TDemoItem> {
    return this.repository.getDemoItemById(id);
  }

  createDemoItem(payload: TCreateDemoItemPayload): Promise<TDemoItem> {
    return this.repository.createDemoItem(payload);
  }

  updateDemoItem(id: string, payload: TUpdateDemoItemPayload): Promise<TDemoItem> {
    return this.repository.updateDemoItem(id, payload);
  }

  async deleteDemoItem(id: string): Promise<void> {
    try {
      await this.repository.deleteDemoItem(id);
    } catch (error: unknown) {
      const body = getApiErrorBody(error);
      throw new Error(body?.message ?? TEXTS.demo.errors.deleteFailed);
    }
  }
}
