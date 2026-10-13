import { useMutation, useQueryClient } from '@tanstack/react-query';
import demoManager from '../services';
import type { TUpdateDemoItemPayload } from '../types/IDemoRepository';
import { DemoQueryEnum } from '../types/DemoQueryEnum';

export function useUpdateDemoItem() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TUpdateDemoItemPayload }) =>
      demoManager.updateDemoItem(id, payload),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: [DemoQueryEnum.getDemoItemsList] });
      void queryClient.invalidateQueries({
        queryKey: [DemoQueryEnum.getDemoItemById, variables.id],
      });
    },
  });

  return {
    updateDemoItem: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
  };
}
