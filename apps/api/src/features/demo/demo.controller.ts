import type { Request } from 'express';
import { AppError } from '../../utils/AppError.js';
import { HttpResponse, type ControllerResponse } from '../../utils/HttpResponse.js';
import type { PaginatedResult } from '../../utils/pagination.js';
import {
  createDemoItemSchema,
  updateDemoItemSchema,
  type DemoItemDto,
} from './demo.model.js';
import type { DemoService } from './demo.service.js';

export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  async getDemoItems(req: Request): Promise<ControllerResponse<PaginatedResult<DemoItemDto>>> {
    if (!req.user) {
      throw new AppError(401, 'unauthorized', 'Usuário não autenticado');
    }

    const items = await this.demoService.getDemoItems({
      search: typeof req.query.search === 'string' ? req.query.search : undefined,
      page: typeof req.query.page === 'string' ? req.query.page : undefined,
      limit: typeof req.query.limit === 'string' ? req.query.limit : undefined,
      authorId: typeof req.query.authorId === 'string' ? req.query.authorId : undefined,
    });

    return HttpResponse.ok(items);
  }

  async getDemoItemById(req: Request): Promise<ControllerResponse<DemoItemDto>> {
    const item = await this.demoService.getDemoItemById(req.params.id as string);
    return HttpResponse.ok(item);
  }

  async createDemoItem(req: Request): Promise<ControllerResponse<DemoItemDto>> {
    if (!req.user) {
      throw new AppError(401, 'unauthorized', 'Usuário não autenticado');
    }

    const input = createDemoItemSchema.parse(req.body);
    const item = await this.demoService.createDemoItem(input, req.user.id);
    return HttpResponse.created(item);
  }

  async updateDemoItem(req: Request): Promise<ControllerResponse<DemoItemDto>> {
    const input = updateDemoItemSchema.parse(req.body);
    const item = await this.demoService.updateDemoItem(req.params.id as string, input);
    return HttpResponse.ok(item);
  }

  async deleteDemoItem(req: Request): Promise<ControllerResponse> {
    await this.demoService.deleteDemoItem(req.params.id as string);
    return HttpResponse.noContent();
  }
}
