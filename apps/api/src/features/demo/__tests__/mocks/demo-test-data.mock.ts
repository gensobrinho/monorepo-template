import type { DemoItemDto } from '../../demo.model.js';
import type { DemoItemWithAuthor } from '../../demo.repository.js';

export const DEMO_ITEM_ENTITY: DemoItemWithAuthor = {
  id: 'demo-item-1',
  title: 'Item de exemplo',
  description: 'Descrição de exemplo para testes unitários.',
  authorId: 'user-1',
  createdAt: new Date('2024-01-15T12:00:00.000Z'),
  updatedAt: new Date('2024-01-15T12:00:00.000Z'),
  author: { id: 'user-1', name: 'Usuário Demo' },
};

export const DEMO_ITEM_DTO: DemoItemDto = {
  id: DEMO_ITEM_ENTITY.id,
  title: DEMO_ITEM_ENTITY.title,
  description: DEMO_ITEM_ENTITY.description,
  authorId: DEMO_ITEM_ENTITY.authorId,
  authorName: DEMO_ITEM_ENTITY.author.name,
  createdAt: DEMO_ITEM_ENTITY.createdAt.toISOString(),
  updatedAt: DEMO_ITEM_ENTITY.updatedAt.toISOString(),
};

export const CREATE_DEMO_ITEM_INPUT = {
  title: 'Novo item',
  description: 'Nova descrição',
};

export const UPDATE_DEMO_ITEM_INPUT = {
  title: 'Item atualizado',
  description: 'Descrição atualizada',
};
