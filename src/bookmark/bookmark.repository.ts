import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkRepo {
  constructor(private readonly prisma: PrismaService) {}

  async get_all(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async create(
    title: string,
    description: string,
    link: string,
    userId: number,
  ) {
    return this.prisma.bookmark.create({
      data: {
        title,
        description,
        link,
        userId,
      },
    });
  }

  async get_by_id(id: number, userId: number) {
    return this.prisma.bookmark.findUnique({
      where: {
        id,
        userId,
      },
    });
  }

  async update(
    title: string,
    description: string,
    link: string,
    id: number,
    userId: number,
  ) {
    const bookmark = await do_prisma_or_null(this.prisma.bookmark.update, {
      where: {
        id,
        userId,
      },
      data: {
        title,
        description,
        link,
      },
    });

    return bookmark;
  }

  async delete(id: number, userId: number) {
    const result = await do_prisma_or_null(this.prisma.bookmark.delete, {
      where: {
        id,
        userId,
      },
    });
    return result;
  }
}

const do_prisma_or_null = async (func, args) => {
  let bookmark = null;
  try {
    bookmark = await func(args);
  } catch (error) {
    if (error.code !== 'P2025') {
      throw new Error(error.message);
    }
  }
  return bookmark;
};
