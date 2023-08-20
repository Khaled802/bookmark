import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { BookmarkRepo } from './bookmark.repository';

@Module({
  providers: [BookmarkService, BookmarkRepo],
  controllers: [BookmarkController],
})
export class BookmarkModule {}
