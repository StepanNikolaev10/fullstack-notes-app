import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AddNoteDto } from './dto/req/add-note.dto';
import { NotesService } from './notes.service';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access-auth.guard';
import { AddNoteResDto } from './dto/res/add-note-res.dto';
import { plainToInstance } from 'class-transformer';
import { GetAccessTokenPayload } from 'src/auth/decorators/get-at-payload.decorator';
import type { Tokens } from 'src/auth/types/tokens.interface';
import { ArchiveNotesDto } from './dto/req/archive-notes.dto';
import { UnarchiveNotesDto } from './dto/req/unarchive-notes.dto';
import { TrashNotesDto } from './dto/req/trash-notes.dto';
import { RestoreTrashedNotesDto } from './dto/req/restore-trashed-notes.dto';
import { DeleteNotesDto } from './dto/req/delete-notes.dto';
import { UpdateNotesColorDto } from './dto/req/update-notes-color.dto';
import { UpdateNoteContentDto } from './dto/req/update-note-content.dto';
import { UpdateNotesColorResDto } from './dto/res/update-notes-color.dto';
import { UpdateNoteContentResDto } from './dto/res/update-note-content-res.dto';
import { UpdateNotePosisionDto } from './dto/req/update-note-position.dto';

@Controller('notes')
export class NotesController {
  
  constructor(
    private readonly notesService: NotesService
  ) {}

  @Post('/add')
  @UseGuards(JwtAccessAuthGuard)
  async addNote(
    @Body() dto: AddNoteDto,
    @GetAccessTokenPayload() accessTokenPayload: Tokens['accessTokenPayload']
  ): Promise<AddNoteResDto> { // передав дженерик промису мы говорим что данный метод на resolve ...
  // ... вернёт тип переданный в этом дженерике.
    const serviceResult = await this.notesService.addNote({ ...dto, authorId: accessTokenPayload.userId }); // await ловит resolve, а код после является then, если ошибка то это throw и catch
    return plainToInstance(AddNoteResDto, serviceResult); // это синхронная функция, она ждёт значение, а не промис, поэтому выше нужен await
  }

  @Post('/archive')
  @UseGuards(JwtAccessAuthGuard)
  archiveNotes(
    @Body() dto: ArchiveNotesDto,
    @GetAccessTokenPayload() accessTokenPayload: Tokens['accessTokenPayload']
  ): Promise<void> {
    return this.notesService.archiveNotes({ ...dto, authorId: accessTokenPayload.userId });
  }

  @Post('/unarchive')
  @UseGuards(JwtAccessAuthGuard)
  unarchiveNotes(
    @Body() dto: UnarchiveNotesDto,
    @GetAccessTokenPayload() accessTokenPayload: Tokens['accessTokenPayload']
  ): Promise<void> {
    return this.notesService.unarchiveNotes({ ...dto, authorId: accessTokenPayload.userId });
  }

  @Post('/trash')
  @UseGuards(JwtAccessAuthGuard)
  trashNotes(
    @Body() dto: TrashNotesDto,
    @GetAccessTokenPayload() accessTokenPayload: Tokens['accessTokenPayload']
  ): Promise<void> {
    return this.notesService.trashNotes({ ...dto, authorId: accessTokenPayload.userId });
  }

  @Post('/restore-trashed')
  @UseGuards(JwtAccessAuthGuard)
  restoreTrashedNotes(
    @Body() dto: RestoreTrashedNotesDto,
    @GetAccessTokenPayload() accessTokenPayload: Tokens['accessTokenPayload']
  ): Promise<void> {
    return this.notesService.restoreTrashedNotes({ ...dto, authorId: accessTokenPayload.userId });
  }

  @Delete('/delete')
  @UseGuards(JwtAccessAuthGuard)
  deleteNotes(
    @Body() dto: DeleteNotesDto,
    @GetAccessTokenPayload() accessTokenPayload: Tokens['accessTokenPayload']
  ): Promise<void> {
    return this.notesService.deleteNotes({ ...dto, authorId: accessTokenPayload.userId });
  }

  @Post('/update-color')
  @UseGuards(JwtAccessAuthGuard)
  async updateNotesColor(
    @Body() dto: UpdateNotesColorDto,
    @GetAccessTokenPayload() accessTokenPayload: Tokens['accessTokenPayload']
  ): Promise<UpdateNotesColorResDto> {
    const serviceResult = await this.notesService.updateNotesColor({ ...dto, authorId: accessTokenPayload.userId });
    return plainToInstance(UpdateNotesColorResDto, serviceResult);
  }

  @Post('/update-content')
  @UseGuards(JwtAccessAuthGuard)
  async UpdateNoteContent(
    @Body() dto: UpdateNoteContentDto,
    @GetAccessTokenPayload() accessTokenPayload: Tokens['accessTokenPayload']
  ): Promise<UpdateNoteContentResDto> {
    const serviceResult = await this.notesService.updateNoteContent({ ...dto, authorId: accessTokenPayload.userId });
    return plainToInstance(UpdateNoteContentResDto, serviceResult);
  }

  @Post('/update-position')
  @UseGuards(JwtAccessAuthGuard)
  UpdateNotePosition(
    @Body() dto: UpdateNotePosisionDto,
    @GetAccessTokenPayload() accessTokenPayload: Tokens['accessTokenPayload']
  ): Promise<void> {
    return this.notesService.updateNotePosition({ ...dto, authorId: accessTokenPayload.userId });
  }

}