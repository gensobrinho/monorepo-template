import { useQuery } from '@tanstack/react-query';
import demoManager from '../services';
import { DemoQueryEnum } from '../types/DemoQueryEnum';

const LIST_LIMIT = 100;

export function useGetDemoItemsList(search?: string) {
  const query = useQuery({
    queryKey: [DemoQueryEnum.getDemoItemsList, search],
    queryFn: () =>
      demoManager.getDemoItems({
        page: 1,
        limit: LIST_LIMIT,
        search,
      }),
  });

  return {
    items: query.data?.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
