import { jest } from '@jest/globals';
import type { IDemoRepository } from '../types/IDemoRepository';

export function createDemoManagerMocks() {
  const repository = {
    getDemoItems: jest.fn<IDemoRepository['getDemoItems']>(),
    getDemoItemById: jest.fn<IDemoRepository['getDemoItemById']>(),
    createDemoItem: jest.fn<IDemoRepository['createDemoItem']>(),
    updateDemoItem: jest.fn<IDemoRepository['updateDemoItem']>(),
    deleteDemoItem: jest.fn<IDemoRepository['deleteDemoItem']>(),
  } satisfies jest.Mocked<IDemoRepository>;

  return { repository };
}
