import { Injectable, NotFoundException } from '@nestjs/common';
import { BookmarkRepo } from './bookmark.repository';
import { BookmarkDTO } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly bookmark_repo: BookmarkRepo) {}

  async get_all_bookmarks(userId: number) {
    const bookmarks = await this.bookmark_repo.get_all(userId);
    if (bookmarks.length) return bookmarks;
    throw new NotFoundException({ msg: 'no bookmrks found' });
  }

  async creat(body: BookmarkDTO, userId: number) {
    return await this.bookmark_repo.create(
      body.title,
      body.description,
      body.link,
      userId,
    );
  }

  async get_bookmark(id: number, userId: number) {
    const bookmark = await this.bookmark_repo.get_by_id(id, userId);
    if (bookmark == null)
      throw new NotFoundException({ msg: 'not found bookmark' });
    return bookmark;
  }

  async update_bookmark(body: BookmarkDTO, id: number, userId: number) {
    const bookmark = await this.bookmark_repo.update(
      body.title,
      body.description,
      body.link,
      id,
      userId,
    );
    if (bookmark == null)
      throw new NotFoundException({ msg: 'not found bookmark' });
    return bookmark;
  }

  async delete_bookmark(id: number, userId: number) {
    const bookmark = await this.bookmark_repo.delete(id, userId);
    if (bookmark == null)
      throw new NotFoundException({ msg: 'not found bookmark' });
    return bookmark;
  }
}
