import { useMutation, useQueryClient } from '@tanstack/react-query';
import demoManager from '../services';
import type { TCreateDemoItemPayload } from '../types/IDemoRepository';
import { DemoQueryEnum } from '../types/DemoQueryEnum';

export function useCreateDemoItem() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: TCreateDemoItemPayload) => demoManager.createDemoItem(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [DemoQueryEnum.getDemoItemsList] });
    },
  });

  return {
    createDemoItem: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
  };
}
