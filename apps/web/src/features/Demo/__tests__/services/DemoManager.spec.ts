import { beforeEach, describe, expect, it } from '@jest/globals';
import { createDemoManagerMocks } from '../../mocks/demo-manager.mock';
import { DEMO_TEST_ITEM } from '../../mocks/demo-test-data.mock';
import { DemoManager } from '../../services/DemoManager';

describe('DemoManager', () => {
  let manager: DemoManager;
  let mocks: ReturnType<typeof createDemoManagerMocks>;

  beforeEach(() => {
    mocks = createDemoManagerMocks();
    manager = new DemoManager(mocks.repository);
  });

  describe('getDemoItems', () => {
    it('should request items with default page and limit', () => {
      mocks.repository.getDemoItems.mockResolvedValue({
        data: [DEMO_TEST_ITEM],
        page: 1,
        limit: 10,
        total: 1,
        hasMore: false,
      });

      return manager.getDemoItems({ search: 'exemplo' }).then((result) => {
        expect(mocks.repository.getDemoItems).toHaveBeenCalledWith({
          search: 'exemplo',
          page: 1,
          limit: 10,
        });
        expect(result.data).toEqual([DEMO_TEST_ITEM]);
      });
    });
  });

  describe('deleteDemoItem', () => {
    it('should delete through the repository', async () => {
      mocks.repository.deleteDemoItem.mockResolvedValue(undefined);

      await manager.deleteDemoItem(DEMO_TEST_ITEM.id);

      expect(mocks.repository.deleteDemoItem).toHaveBeenCalledWith(DEMO_TEST_ITEM.id);
    });
  });
});
