import { z } from 'zod';

export const createDemoItemSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
});

export const updateDemoItemSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
});

export type CreateDemoItemInput = z.infer<typeof createDemoItemSchema>;
export type UpdateDemoItemInput = z.infer<typeof updateDemoItemSchema>;

export type DemoItemDto = {
  id: string;
  title: string;
  description: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
};
