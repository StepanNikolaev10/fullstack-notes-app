import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Note, Prisma, status, User } from '../../prisma/generated/client';
import { AddNoteDto } from './dtos/add-note.dto';
import { ArchiveNotesDto } from './dtos/archive-notes.dto';
import { UnarchiveNotesDto } from './dtos/unarchive-notes.dto';
import { TrashNotesDto } from './dtos/trash-notes.dto';
import { RestoreTrashedNotesDto } from './dtos/restore-trashed-notes.dto';
import { DeleteNotesDto } from './dtos/delete-notes.dto';
import { UpdateNotesColorDto } from './dtos/update-notes-color.dto';
import { UpdateNoteContentDto } from './dtos/update-note-content.dto';
import { UpdateNotePositionDto } from './dtos/update-note-position.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prismaService: PrismaService) {}

  // Добавить заметку
  addNote(dto: AddNoteDto, authorId: User['id']) {
    return this.prismaService.$transaction(async (prisma) => {
      const lastDefaultNote = await prisma.note.findFirst({
        where: { status: 'default', authorId: authorId },
        orderBy: { positionNumber: 'desc' },
      });

      let newDefaultPositionNumber = lastDefaultNote?.positionNumber
        ? lastDefaultNote.positionNumber + 1
        : 1;

      const newNote = await prisma.note.create({
        data: {
          title: dto.title,
          text: dto.text,
          authorId: authorId,
          positionNumber: newDefaultPositionNumber,
        },
      });

      return { createdAt: newNote.createdAt, updatedAt: newNote.updatedAt };
    });
  }

  // Поместить заметки в архив
  archiveNotes(dto: ArchiveNotesDto, authorId: User['id']) {
    return this.changeNoteStatus({
      noteIds: dto.noteIds,
      currentStatus: 'default',
      selectedStatus: 'archived',
      authorId: authorId,
    });
  }

  // Вынуть из архива
  unarchiveNotes(dto: UnarchiveNotesDto, authorId: User['id']) {
    return this.changeNoteStatus({
      noteIds: dto.noteIds,
      currentStatus: 'archived',
      selectedStatus: 'default',
      authorId: authorId,
    });
  }

  // Поместить заметки в корзину
  trashNotes(dto: TrashNotesDto, authorId: User['id']) {
    return this.changeNoteStatus({
      noteIds: dto.noteIds,
      currentStatus: dto.currentStatus,
      selectedStatus: 'trashed',
      authorId: authorId,
    });
  }

  // Вернуть заметки из корзины
  restoreTrashedNotes(dto: RestoreTrashedNotesDto, authorId: User['id']) {
    return this.changeNoteStatus({
      noteIds: dto.noteIds,
      currentStatus: 'trashed',
      selectedStatus: 'default',
      authorId: authorId,
    });
  }

  // Удалить заметки
  deleteNotes(dto: DeleteNotesDto, authorId: User['id']) {
    return this.prismaService.$transaction(async (prisma) => {
      const notesToDelete = await prisma.note.findMany({
        where: {
          id: { in: dto.noteIds },
          status: 'trashed',
          authorId: authorId,
        },
        orderBy: { positionNumber: 'desc' },
      });

      if (notesToDelete.length < dto.noteIds.length) {
        throw new ForbiddenException(
          'Failed to delete notes due to their current status or access restrictions.',
        );
      }

      await prisma.note.deleteMany({
        where: { id: { in: dto.noteIds } },
      });

      const oldPositions = notesToDelete.map((note) => note.positionNumber);
      for (const pos of oldPositions) {
        await prisma.note.updateMany({
          where: {
            status: 'trashed',
            authorId: authorId,
            positionNumber: { gt: pos },
          },
          data: {
            positionNumber: { decrement: 1 },
          },
        });
      }
    });
  }

  // Обновить цвет заметки
  async updateNotesColor(dto: UpdateNotesColorDto, authorId: User['id']) {
    await this.prismaService.note.updateMany({
      where: {
        id: { in: dto.noteIds },
        authorId: authorId,
        status: { in: ['default', 'archived'] },
      },
      data: { colorKey: dto.updatedColorKey },
    });

    const updatedNotes = await this.prismaService.note.findMany({
      where: {
        id: { in: dto.noteIds },
        authorId: authorId,
        status: { in: ['default', 'archived'] },
      },
      select: { id: true, updatedAt: true },
    });

    return {
      updatedNotesData: updatedNotes.map((note) => ({
        noteId: note.id,
        updatedAt: note.updatedAt,
      })),
    };
  }

  // Обновить контент заметки
  async updateNoteContent(dto: UpdateNoteContentDto, authorId: User['id']) {
    const updateResult = await this.prismaService.note.updateMany({
      where: {
        id: dto.noteId,
        authorId: authorId,
        status: { in: ['default', 'archived'] },
      },
      data: { title: dto.updatedTitle, text: dto.updatedText },
    });

    if (updateResult.count === 0) {
      throw new NotFoundException('Note not found or access denied');
    }

    const updatedNote = await this.prismaService.note.findUniqueOrThrow({
      where: { id: dto.noteId },
      select: { updatedAt: true },
    });

    return {
      updatedAt: updatedNote.updatedAt,
    };
  }

  // Сменить позицию заметки
  updateNotePosition(dto: UpdateNotePositionDto, authorId: User['id']) {
    return this.prismaService.$transaction(async (prisma) => {
      const currentNote = await prisma.note.findFirst({
        where: { id: dto.noteId, authorId: authorId },
      });

      if (!currentNote) throw new NotFoundException();

      if (dto.updatedPositionNumber === currentNote.positionNumber) return;
      if (dto.updatedPositionNumber < 1)
        throw new BadRequestException('Cannot move note any lower.');

      const lastNote = await prisma.note.findFirst({
        where: { status: currentNote.status, authorId: authorId },
        orderBy: { positionNumber: 'desc' },
      });

      const maxPosition = lastNote ? lastNote.positionNumber : 1;

      if (dto.updatedPositionNumber > maxPosition) {
        throw new BadRequestException(`Cannot move note any higher.`);
      }

      if (dto.updatedPositionNumber > currentNote.positionNumber) {
        await prisma.note.updateMany({
          where: {
            status: currentNote.status,
            authorId: authorId,
            positionNumber: {
              gte: currentNote.positionNumber + 1,
              lte: dto.updatedPositionNumber,
            },
          },
          data: {
            positionNumber: { decrement: 1 },
          },
        });
      } else {
        await prisma.note.updateMany({
          where: {
            status: currentNote.status,
            authorId: authorId,
            positionNumber: {
              gte: dto.updatedPositionNumber,
              lte: currentNote.positionNumber - 1,
            },
          },
          data: {
            positionNumber: { increment: 1 },
          },
        });
      }

      await prisma.note.update({
        where: { id: dto.noteId },
        data: { positionNumber: dto.updatedPositionNumber },
      });
    });
  }

  // Сменить статус заметки
  private changeNoteStatus(args: {
    noteIds: Note['id'][];
    currentStatus: status;
    selectedStatus: status;
    authorId: Note['authorId'];
  }) {
    return this.prismaService.$transaction(async (prisma) => {
      // Получение и проверка на существование в этом статусе заметок которые прислал юзер.
      const notesToChange = await this.prismaService.note.findMany({
        where: {
          id: { in: args.noteIds },
          status: args.currentStatus,
          authorId: args.authorId,
        },
        orderBy: { positionNumber: 'desc' },
      });

      if (notesToChange.length < args.noteIds.length) {
        throw new ForbiddenException(
          'Failed to archive notes due to their current status or access restrictions.',
        );
      }

      // Получение самой последней заметки по postitionNumber
      // из списка заметок с выбранным статусом для вычисления positionNumber,
      // для перемащемых в новый статус заметок.
      const lastNoteInSelectedStatus = await prisma.note.findFirst({
        where: { status: args.selectedStatus, authorId: args.authorId },
        orderBy: { positionNumber: 'desc' },
      });

      // Вычисление positionNumber для перемещамых в новый статус заметок (последнее место)
      let newPositionNumberInSelectedStatus =
        lastNoteInSelectedStatus?.positionNumber
          ? lastNoteInSelectedStatus.positionNumber + 1
          : 1;

      // Изменение статуса извлеченных заметок на selectedStatus и установка нового
      for (const note of notesToChange) {
        await prisma.note.update({
          where: { id: note.id },
          data: {
            status: args.selectedStatus,
            positionNumber: newPositionNumberInSelectedStatus++,
          },
        });
      }

      // Получение позиции, которые заметки занимали ранее (для сдвига).
      const oldPositions = notesToChange.map((note) => note.positionNumber);

      // Закрытие дыр в нумерации заметок прошлого статуса путём сдвига positionNumber на -1.
      // Массив oldPositions отсортирован от большего к меньшему, чтобы закрывать дыры с конца списка.
      // Если идти по возрастанию, первый же сдвиг собьет нумерацию для всех оставшихся дыр.
      for (const pos of oldPositions) {
        await prisma.note.updateMany({
          where: {
            status: args.currentStatus,
            authorId: args.authorId,
            positionNumber: { gt: pos }, // gt - geater than
          },
          data: {
            positionNumber: { decrement: 1 },
          },
        });
      }
    });
  }
}
