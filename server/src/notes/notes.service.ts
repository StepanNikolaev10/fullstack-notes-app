import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { NoteEntity } from './note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, MoreThan, Repository } from 'typeorm';
import { AddNoteArgs, ArchiveNotesArgs, DeleteNotesArgs, RestoreTrashedNotesArgs, TrashNotesArgs, UnarchiveNotesArgs, UpdateNoteContentArgs, UpdateNotePositionArgs, UpdateNotesColorArgs } from './types/services/notes-service-args.interfaces';
import { AddNoteResult, UpdateNoteContentResult, UpdateNotesColorResult } from './types/services/notes-service-results.interfaces';


@Injectable()
export class NotesService {

  @InjectRepository(NoteEntity) // даёт репозиторий(пульт управления на таблицей) для свойства ниже, ...
  // ...свойство не будет undefined из за присваивания значения декоратором.
  private noteRepository: Repository<NoteEntity>  // значения падает в userRepository,  ...
  // ...но для удобной работы используется тип Repository с добавлением методов автокомлитом и дженерик с типами сущности Note

  async addNote(args: AddNoteArgs): Promise<AddNoteResult> {
    return await this.noteRepository.manager.transaction(async (manager) => {
      const lastDefaultNote = await manager.findOne(NoteEntity, {
        where: { status: 'default', authorId: args.authorId },
        order: { positionNumber: 'DESC'}
      });

      let newDefaultPositionNumber = lastDefaultNote?.positionNumber ? lastDefaultNote.positionNumber + 1 : 1;
      const newNote = manager.create(NoteEntity, {
        ...args,
        status: 'default',
        positionNumber: newDefaultPositionNumber
      })

      await manager.save(newNote);
      return { createdAt: newNote.createdAt, updatedAt: newNote.createdAt }
    });
  }

  async archiveNotes(args: ArchiveNotesArgs): Promise<void> {

    return await this.noteRepository.manager.transaction(async (manager) => {
      const notesToArchive = await manager.find(NoteEntity, {
        where: { id: In(args.noteIds), status: 'default', authorId: args.authorId },
        order: { positionNumber: 'DESC' }
      });

      if(notesToArchive.length < args.noteIds.length) {
        throw new ForbiddenException('Failed to archive notes due to them current status or access restrictions.');
      }

      const lastArchivedNote = await manager.findOne(NoteEntity, {
        where: { status: 'archived', authorId: args.authorId },
        order: { positionNumber: 'DESC'}
      });

      const oldPositions = notesToArchive.map(note => note.positionNumber);
      let newArchivedPositionNumber = lastArchivedNote?.positionNumber ? lastArchivedNote.positionNumber + 1 : 1;

      notesToArchive.forEach(note => {
        note.status = 'archived';
        note.positionNumber = newArchivedPositionNumber++;
      });
      await manager.save(notesToArchive);

      for (const pos of oldPositions) {
        await manager.decrement(NoteEntity, 
          { 
            status: 'default', 
            authorId: args.authorId,
            positionNumber: MoreThan(pos) 
          }, 
          'positionNumber', 
          1
        );
      }
    });

  }

  async unarchiveNotes(args: UnarchiveNotesArgs): Promise<void> {

    return await this.noteRepository.manager.transaction(async (manager) => {
      const notesToDefault = await manager.find(NoteEntity, {
        where: { id: In(args.noteIds), status: 'archived', authorId: args.authorId },
        order: { positionNumber: 'DESC' }
      });

      if(notesToDefault.length < args.noteIds.length) {
        throw new ForbiddenException('Failed to unarchive notes due to them current status or access restrictions.');
      }

      const lastDefaultNote = await manager.findOne(NoteEntity, {
        where: { status: 'default', authorId: args.authorId },
        order: { positionNumber: 'DESC'}
      });

      const oldPositions = notesToDefault.map(note => note.positionNumber);
      let newDefaultPositionNumber = lastDefaultNote?.positionNumber ? lastDefaultNote.positionNumber + 1 : 1;

      notesToDefault.forEach(note => {
        note.status = 'default';
        note.positionNumber = newDefaultPositionNumber++;
      });
      await manager.save(notesToDefault);

      for (const pos of oldPositions) {
        await manager.decrement(NoteEntity, 
          { 
            status: 'default', 
            authorId: args.authorId,
            positionNumber: MoreThan(pos) 
          }, 
          'positionNumber', 
          1
        );
      }
    });

  }

  async trashNotes(args: TrashNotesArgs): Promise<void> {

    return await this.noteRepository.manager.transaction(async (manager) => {
      const notesToTrash = await manager.find(NoteEntity, {
        where: { id: In(args.noteIds), status: In(['default', 'archived']), authorId: args.authorId },
        order: { positionNumber: 'DESC' }
      });

      if(notesToTrash.length < args.noteIds.length) {
        throw new ForbiddenException('Failed to trash notes due to them current status or access restrictions.');
      }

      const lastTrashedNote = await manager.findOne(NoteEntity, {
        where: { status: 'trashed', authorId: args.authorId },
        order: { positionNumber: 'DESC'}
      });

      const oldNotesToTrashState = notesToTrash.map(note => ({
        status: note.status,
        positionNumber: note.positionNumber
      }));
      let newTrashedPositionNumber = lastTrashedNote?.positionNumber ? lastTrashedNote.positionNumber + 1 : 1;

      notesToTrash.forEach(note => {
        note.status = 'trashed';
        note.positionNumber = newTrashedPositionNumber++;
      });
      await manager.save(notesToTrash);

      for (const oldNoteState of oldNotesToTrashState) {
        await manager.decrement(NoteEntity, 
          { 
            status: oldNoteState.status, 
            authorId: args.authorId,
            positionNumber: MoreThan(oldNoteState.positionNumber) 
          }, 
          'positionNumber', 
          1
        );
      }
    });

  }

  async restoreTrashedNotes(args: RestoreTrashedNotesArgs): Promise<void> {

    return await this.noteRepository.manager.transaction(async (manager) => {
      const notesToRestore = await manager.find(NoteEntity, {
        where: { id: In(args.noteIds), status: 'trashed', authorId: args.authorId },
        order: { positionNumber: 'DESC' }
      });

      if(notesToRestore.length < args.noteIds.length) {
        throw new ForbiddenException('Failed to restore notes due to them current status or access restrictions.');
      }

      const lastDefaultNote = await manager.findOne(NoteEntity, {
        where: { status: 'default', authorId: args.authorId },
        order: { positionNumber: 'DESC'}
      });

      const oldPositions = notesToRestore.map(note => note.positionNumber);
      let newDefaultPositionNumber = lastDefaultNote?.positionNumber ? lastDefaultNote.positionNumber + 1 : 1;

      notesToRestore.forEach(note => {
        note.status = 'default';
        note.positionNumber = newDefaultPositionNumber++;
      });
      await manager.save(notesToRestore);

      for (const pos of oldPositions) {
        await manager.decrement(NoteEntity, 
          { 
            status: 'trashed', 
            authorId: args.authorId,
            positionNumber: MoreThan(pos) 
          }, 
          'positionNumber', 
          1
        );
      }
    });

  }

  async deleteNotes(args: DeleteNotesArgs): Promise<void> {

    return await this.noteRepository.manager.transaction(async (manager) => {
      const notesToDelete = await manager.find(NoteEntity, {
        where: { id: In(args.noteIds), status: 'trashed', authorId: args.authorId },
        order: { positionNumber: 'DESC' }
      });

      if(notesToDelete.length < args.noteIds.length) {
        throw new ForbiddenException('Failed to delete notes due to them current status or access restrictions.');
      }

      await manager.delete(NoteEntity, { id: In(args.noteIds) });

      const oldPositions = notesToDelete.map(note => note.positionNumber);
      for (const pos of oldPositions) {
        await manager.decrement(NoteEntity, 
          { 
            status: 'trashed', 
            authorId: args.authorId,
            positionNumber: MoreThan(pos) 
          }, 
          'positionNumber', 
          1
        );
      }
    });

  }

  async updateNotesColor(args: UpdateNotesColorArgs): Promise<UpdateNotesColorResult> {
    await this.noteRepository.update(
      { id: In(args.noteIds), authorId: args.authorId, status: In(['default', 'archived']) },
      { colorKey: args.updatedColorKey }
    )

    const updatedNotes = await this.noteRepository.find({
      where: {
        id: In(args.noteIds),
        authorId: args.authorId,
        status: In(['default', 'archived'])
      },
      select: ['id', 'updatedAt']
    });

    return {
      updatedNotesData: updatedNotes.map(note => ({
        noteId: note.id,
        updatedAt: note.updatedAt
      }))
    }
  }

  async updateNoteContent(args: UpdateNoteContentArgs): Promise<UpdateNoteContentResult> {
    await this.noteRepository.update(
      { id: args.noteId, authorId: args.authorId, status: In(['default', 'archived']) },
      { title: args.updatedTitle, mainText: args.updatedMainText }
    )

    const updatedNote = await this.noteRepository.findOne({
      where: { id: args.noteId, authorId: args.authorId },
      select: ['updatedAt']
    })

    if (!updatedNote) {
      throw new NotFoundException('Note not found or access denied');
    }

    return {
      updatedAt: updatedNote.updatedAt
    }
  }

  async updateNotePosition(args: UpdateNotePositionArgs): Promise<void> {

    await this.noteRepository.manager.transaction(async (manager) => {
      const currentNote = await manager.findOne(NoteEntity, {
        where: { id: args.noteId, authorId: args.authorId }
      });

      if (!currentNote) throw new NotFoundException();

      if (args.updatedPositionNumber === currentNote.positionNumber) return;
      if (args.updatedPositionNumber < 1) throw new BadRequestException('Cannot move note any lower.');

      const lastNote = await manager.findOne(NoteEntity, {
        where: { status: currentNote.status, authorId: args.authorId },
        order: { positionNumber: 'DESC' }
      });

      const maxPosition = lastNote ? lastNote.positionNumber : 1;

      if (args.updatedPositionNumber > maxPosition) {
        throw new BadRequestException(`Cannot move note any higher.`);
      }

      if(args.updatedPositionNumber > currentNote.positionNumber) {
        await manager.decrement(NoteEntity, { 
            status: currentNote.status, 
            authorId: args.authorId,
            positionNumber: Between(currentNote.positionNumber + 1, args.updatedPositionNumber) 
          }, 
          'positionNumber', 
          1
        );
      } else {
        await manager.increment(NoteEntity, { 
            status: currentNote.status, 
            authorId: args.authorId,
            positionNumber: Between(args.updatedPositionNumber, currentNote.positionNumber - 1) 
          }, 
          'positionNumber', 
          1
        );
      }

      await manager.update(NoteEntity, 
        { id: args.noteId }, 
        { positionNumber: args.updatedPositionNumber }
      );
    });

  }
  
}

// ТРАНЗАКЦИИ TYPE ORM

// Что бы использовать функционал транзакций в type orm нужно получить      
// entity manager, entity manager отвечает за все сущности в бд, доступ к нему его экземпляру есть у любого
// экземпляра Repository, а уже с помощью entity manager можно обратиться к transaction и создать транзакции, этот  
// метод принимает асинхронный коллбек с аргументом manager, с помощью которого внутри данного коллбека мы
// совершаем все операции
