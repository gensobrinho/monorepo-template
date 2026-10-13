import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { DemoService } from '../../demo.service.js';
import { createDemoServiceMocks } from '../mocks/demo-service.mock.js';
import {
  CREATE_DEMO_ITEM_INPUT,
  DEMO_ITEM_DTO,
  DEMO_ITEM_ENTITY,
  UPDATE_DEMO_ITEM_INPUT,
} from '../mocks/demo-test-data.mock.js';

describe('DemoService', () => {
  let service: DemoService;
  let mocks: ReturnType<typeof createDemoServiceMocks>;

  beforeEach(() => {
    mocks = createDemoServiceMocks();
    service = new DemoService(mocks.demoRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getDemoItems', () => {
    it('should return a paginated list of demo items', async () => {
      mocks.demoRepository.findMany.mockResolvedValue({
        items: [DEMO_ITEM_ENTITY],
        total: 1,
      });

      const result = await service.getDemoItems({ page: 1, limit: 10 });

      expect(result).toEqual({
        data: [DEMO_ITEM_DTO],
        page: 1,
        limit: 10,
        total: 1,
        hasMore: false,
      });
    });
  });

  describe('getDemoItemById', () => {
    it('should return the item when it exists', async () => {
      mocks.demoRepository.findById.mockResolvedValue(DEMO_ITEM_ENTITY);

      const result = await service.getDemoItemById(DEMO_ITEM_ENTITY.id);

      expect(result).toEqual(DEMO_ITEM_DTO);
    });

    it('should throw demo_item_not_found when the item does not exist', async () => {
      mocks.demoRepository.findById.mockResolvedValue(null);

      await expect(service.getDemoItemById('missing')).rejects.toMatchObject({
        statusCode: 404,
        id: 'demo_item_not_found',
      });
    });
  });

  describe('createDemoItem', () => {
    it('should create a demo item for a valid author', async () => {
      mocks.demoRepository.findAuthor.mockResolvedValue({ id: 'user-1' });
      mocks.demoRepository.create.mockResolvedValue(DEMO_ITEM_ENTITY);

      const result = await service.createDemoItem(CREATE_DEMO_ITEM_INPUT, 'user-1');

      expect(result).toEqual(DEMO_ITEM_DTO);
      expect(mocks.demoRepository.create).toHaveBeenCalledWith({
        title: CREATE_DEMO_ITEM_INPUT.title,
        description: CREATE_DEMO_ITEM_INPUT.description,
        authorId: 'user-1',
      });
    });

    it('should throw author_not_found when the author does not exist', async () => {
      mocks.demoRepository.findAuthor.mockResolvedValue(null);

      await expect(
        service.createDemoItem(CREATE_DEMO_ITEM_INPUT, 'missing-user'),
      ).rejects.toMatchObject({
        statusCode: 400,
        id: 'author_not_found',
      });
    });
  });

  describe('updateDemoItem', () => {
    it('should update the demo item when it exists', async () => {
      const updatedEntity = {
        ...DEMO_ITEM_ENTITY,
        title: UPDATE_DEMO_ITEM_INPUT.title,
        description: UPDATE_DEMO_ITEM_INPUT.description,
      };
      mocks.demoRepository.findById.mockResolvedValue(DEMO_ITEM_ENTITY);
      mocks.demoRepository.update.mockResolvedValue(updatedEntity);

      const result = await service.updateDemoItem(DEMO_ITEM_ENTITY.id, UPDATE_DEMO_ITEM_INPUT);

      expect(result.title).toBe(UPDATE_DEMO_ITEM_INPUT.title);
      expect(mocks.demoRepository.update).toHaveBeenCalledWith(DEMO_ITEM_ENTITY.id, {
        title: UPDATE_DEMO_ITEM_INPUT.title,
        description: UPDATE_DEMO_ITEM_INPUT.description,
      });
    });
  });

  describe('deleteDemoItem', () => {
    it('should delete the demo item when it exists', async () => {
      mocks.demoRepository.findById.mockResolvedValue(DEMO_ITEM_ENTITY);
      mocks.demoRepository.delete.mockResolvedValue(DEMO_ITEM_ENTITY);

      await service.deleteDemoItem(DEMO_ITEM_ENTITY.id);

      expect(mocks.demoRepository.delete).toHaveBeenCalledWith(DEMO_ITEM_ENTITY.id);
    });
  });
});
