import { useQuery } from '@tanstack/react-query';
import demoManager from '../services';
import { DemoQueryEnum } from '../types/DemoQueryEnum';

export function useDemoItemDetails(itemId: string | null) {
  const query = useQuery({
    queryKey: [DemoQueryEnum.getDemoItemById, itemId],
    queryFn: () => demoManager.getDemoItemById(itemId!),
    enabled: Boolean(itemId),
  });

  return {
    item: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error,
  };
}
