import { jest } from '@jest/globals';
import type { DemoRepository } from '../../demo.repository.js';

export function createDemoServiceMocks() {
  const demoRepository = {
    findMany: jest.fn<DemoRepository['findMany']>(),
    findById: jest.fn<DemoRepository['findById']>(),
    create: jest.fn<DemoRepository['create']>(),
    update: jest.fn<DemoRepository['update']>(),
    delete: jest.fn<DemoRepository['delete']>(),
    findAuthor: jest.fn<DemoRepository['findAuthor']>(),
  } satisfies jest.Mocked<Pick<
    DemoRepository,
    'findMany' | 'findById' | 'create' | 'update' | 'delete' | 'findAuthor'
  >>;

  return { demoRepository };
}
