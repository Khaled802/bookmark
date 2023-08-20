import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  ParseIntPipe,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BookmarkDTO } from './dto';
import { BookmarkService } from './bookmark.service';

@Controller('bookmarks')
export class BookmarkController {
  constructor(readonly bookmarkService: BookmarkService) {}

  @Get()
  async get_all_bookmarks(@Req() req: any) {
    const { userId } = req.user;
    return this.bookmarkService.get_all_bookmarks(userId);
  }

  @Post()
  async create_bookmark(@Body() body: BookmarkDTO, @Req() req: any) {
    const { userId } = req.user;
    return this.bookmarkService.creat(body, userId);
  }

  @Get(':id')
  async get_bookmark(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const { userId } = req.user;
    return this.bookmarkService.get_bookmark(id, userId);
  }

  @Put(':id')
  async update_bookmark(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Body() body: BookmarkDTO,
  ) {
    const { userId } = req.user;
    return this.bookmarkService.update_bookmark(body, id, userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete_bookmark(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    const { userId } = req.user;
    return this.bookmarkService.delete_bookmark(id, userId);
  }
}
