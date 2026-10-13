import { AppError } from '../../utils/AppError.js';
import {
  buildPaginatedResult,
  parsePagination,
  paginationSkip,
  type PaginatedResult,
} from '../../utils/pagination.js';
import type {
  CreateDemoItemInput,
  DemoItemDto,
  UpdateDemoItemInput,
} from './demo.model.js';
import type { DemoRepository, DemoItemWithAuthor } from './demo.repository.js';

function toDemoItemDto(item: DemoItemWithAuthor): DemoItemDto {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    authorId: item.authorId,
    authorName: item.author.name,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

export class DemoService {
  constructor(private readonly demoRepository: DemoRepository) {}

  async getDemoItems(params: {
    search?: string;
    page?: string | number;
    limit?: string | number;
    authorId?: string;
  }): Promise<PaginatedResult<DemoItemDto>> {
    const { page, limit } = parsePagination(params.page, params.limit);

    const { items, total } = await this.demoRepository.findMany({
      search: params.search,
      authorId: params.authorId,
      skip: paginationSkip(page, limit),
      take: limit,
    });

    return buildPaginatedResult(items.map(toDemoItemDto), total, page, limit);
  }

  async getDemoItemById(id: string): Promise<DemoItemDto> {
    const item = await this.demoRepository.findById(id);

    if (!item) {
      throw new AppError(404, 'demo_item_not_found', 'Item de exemplo não encontrado');
    }

    return toDemoItemDto(item);
  }

  async createDemoItem(
    input: CreateDemoItemInput,
    authorId: string,
  ): Promise<DemoItemDto> {
    await this.assertAuthorExists(authorId);

    const item = await this.demoRepository.create({
      title: input.title.trim(),
      description: input.description.trim(),
      authorId,
    });

    return toDemoItemDto(item);
  }

  async updateDemoItem(id: string, input: UpdateDemoItemInput): Promise<DemoItemDto> {
    const existing = await this.demoRepository.findById(id);

    if (!existing) {
      throw new AppError(404, 'demo_item_not_found', 'Item de exemplo não encontrado');
    }

    const item = await this.demoRepository.update(id, {
      title: input.title.trim(),
      description: input.description.trim(),
    });

    return toDemoItemDto(item);
  }

  async deleteDemoItem(id: string): Promise<void> {
    const existing = await this.demoRepository.findById(id);

    if (!existing) {
      throw new AppError(404, 'demo_item_not_found', 'Item de exemplo não encontrado');
    }

    await this.demoRepository.delete(id);
  }

  private async assertAuthorExists(authorId: string): Promise<void> {
    const user = await this.demoRepository.findAuthor(authorId);

    if (!user) {
      throw new AppError(400, 'author_not_found', 'Autor não encontrado');
    }
  }
}
