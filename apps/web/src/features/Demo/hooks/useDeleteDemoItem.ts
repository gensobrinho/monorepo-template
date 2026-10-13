import { useMutation, useQueryClient } from '@tanstack/react-query';
import demoManager from '../services';
import { DemoQueryEnum } from '../types/DemoQueryEnum';

export function useDeleteDemoItem() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => demoManager.deleteDemoItem(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [DemoQueryEnum.getDemoItemsList] });
    },
  });

  return {
    deleteDemoItem: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    error: mutation.error,
  };
}
