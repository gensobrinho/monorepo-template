import type { DemoItem, Prisma, PrismaClient } from '@prisma/client';

export type DemoItemWithAuthor = DemoItem & {
  author: { id: string; name: string };
};

export class DemoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findMany(params: {
    search?: string;
    authorId?: string;
    skip: number;
    take: number;
  }): Promise<{ items: DemoItemWithAuthor[]; total: number }> {
    const where: Prisma.DemoItemWhereInput = {};

    if (params.authorId) {
      where.authorId = params.authorId;
    }

    if (params.search?.trim()) {
      where.title = {
        contains: params.search.trim(),
        mode: 'insensitive',
      };
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.demoItem.findMany({
        where,
        include: { author: { select: { id: true, name: true } } },
        orderBy: { updatedAt: 'desc' },
        skip: params.skip,
        take: params.take,
      }),
      this.prisma.demoItem.count({ where }),
    ]);

    return { items, total };
  }

  findById(id: string): Promise<DemoItemWithAuthor | null> {
    return this.prisma.demoItem.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true } } },
    });
  }

  create(data: {
    title: string;
    description: string;
    authorId: string;
  }): Promise<DemoItemWithAuthor> {
    return this.prisma.demoItem.create({
      data,
      include: { author: { select: { id: true, name: true } } },
    });
  }

  update(
    id: string,
    data: {
      title?: string;
      description?: string;
    },
  ): Promise<DemoItemWithAuthor> {
    return this.prisma.demoItem.update({
      where: { id },
      data,
      include: { author: { select: { id: true, name: true } } },
    });
  }

  delete(id: string): Promise<DemoItem> {
    return this.prisma.demoItem.delete({ where: { id } });
  }

  findAuthor(id: string): Promise<{ id: string } | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });
  }
}
