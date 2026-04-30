import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AddNoteDto } from './dtos/add-note.dto';
import { NotesService } from './notes.service';
import { ArchiveNotesDto } from './dtos/archive-notes.dto';
import { UnarchiveNotesDto } from './dtos/unarchive-notes.dto';
import { TrashNotesDto } from './dtos/trash-notes.dto';
import { RestoreTrashedNotesDto } from './dtos/restore-trashed-notes.dto';
import { DeleteNotesDto } from './dtos/delete-notes.dto';
import { UpdateNotesColorDto } from './dtos/update-notes-color.dto';
import { UpdateNoteContentDto } from './dtos/update-note-content.dto';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-access-auth.guard';
import { GetAccessTokenPayload } from '../auth/decorators/get-at-payload.decorator';
import type { TJwtPayload } from '../auth/types/jwt-payload';
import { UpdateNotePositionDto } from './dtos/update-note-position.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('/add')
  @UseGuards(JwtAccessAuthGuard)
  addNote(
    @Body() dto: AddNoteDto,
    @GetAccessTokenPayload() accessJwtPayload: TJwtPayload,
  ) {
    return this.notesService.addNote(dto, accessJwtPayload.userId);
  }

  @Post('/archive')
  @UseGuards(JwtAccessAuthGuard)
  archiveNotes(
    @Body() dto: ArchiveNotesDto,
    @GetAccessTokenPayload() accessJwtPayload: TJwtPayload,
  ) {
    return this.notesService.archiveNotes(dto, accessJwtPayload.userId);
  }

  @Post('/unarchive')
  @UseGuards(JwtAccessAuthGuard)
  unarchiveNotes(
    @Body() dto: UnarchiveNotesDto,
    @GetAccessTokenPayload() accessJwtPayload: TJwtPayload,
  ) {
    return this.notesService.unarchiveNotes(dto, accessJwtPayload.userId);
  }

  @Post('/trash')
  @UseGuards(JwtAccessAuthGuard)
  trashNotes(
    @Body() dto: TrashNotesDto,
    @GetAccessTokenPayload() accessJwtPayload: TJwtPayload,
  ) {
    return this.notesService.trashNotes(dto, accessJwtPayload.userId);
  }

  @Post('/restore-trashed')
  @UseGuards(JwtAccessAuthGuard)
  restoreTrashedNotes(
    @Body() dto: RestoreTrashedNotesDto,
    @GetAccessTokenPayload() accessJwtPayload: TJwtPayload,
  ) {
    return this.notesService.restoreTrashedNotes(dto, accessJwtPayload.userId);
  }

  @Delete('/delete')
  @UseGuards(JwtAccessAuthGuard)
  deleteNotes(
    @Body() dto: DeleteNotesDto,
    @GetAccessTokenPayload() accessJwtPayload: TJwtPayload,
  ) {
    return this.notesService.deleteNotes(dto, accessJwtPayload.userId);
  }

  @Post('/update-color')
  @UseGuards(JwtAccessAuthGuard)
  updateNotesColor(
    @Body() dto: UpdateNotesColorDto,
    @GetAccessTokenPayload() accessJwtPayload: TJwtPayload,
  ) {
    return this.notesService.updateNotesColor(dto, accessJwtPayload.userId);
  }

  @Post('/update-content')
  @UseGuards(JwtAccessAuthGuard)
  updateNoteContent(
    @Body() dto: UpdateNoteContentDto,
    @GetAccessTokenPayload() accessJwtPayload: TJwtPayload,
  ) {
    return this.notesService.updateNoteContent(dto, accessJwtPayload.userId);
  }

  @Post('/update-position')
  @UseGuards(JwtAccessAuthGuard)
  updateNotePosition(
    @Body() dto: UpdateNotePositionDto,
    @GetAccessTokenPayload() accessJwtPayload: TJwtPayload,
  ) {
    return this.notesService.updateNotePosition(dto, accessJwtPayload.userId);
  }
}
