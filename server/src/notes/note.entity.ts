import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "src/users/user.entity";
import type { Note } from "./types/note.interface";
import type { NoteColorsKeys } from "./types/note-colors.interface";

@Entity('notes')
export class NoteEntity implements Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  mainText: string;

  @Column({ default: 'UNCOLORED' })
  colorKey: NoteColorsKeys;

  @Column({ default: 'default'})
  status: 'default' | 'archived' | 'trashed';

  @Column()
  positionNumber: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column()
  authorId: number; // foreign key, id иностранца с другой таблицы, указывается в сервисе, берётся из токена.
  // если не существует такого юзера, то заметка создана не будет.

  @ManyToOne(() => UserEntity, (user) => user.notes, { // Связь между таблицами(1. target, 2. Поле, 3.Опции)
    onDelete: 'CASCADE',
    nullable: false
  }) 
  @JoinColumn({ name: 'authorId' }) // указываем что authorId будет является foreign key, да бы не делать лишний запрос на получение данных юзера в БД.
  author: UserEntity;

}


// ЕСЛИ НЕ УКАЗЫВАТЬ КЛЮЧ ВРУЧНУЮ ИЗ ТОКЕНА СЕРВИСЕ ТО ПРИШЛОСЬ БЫ ДЕЛАТЬ ТАК!

// // 1. Сначала идем в базу за юзером (лишний запрос!)
// const user = await this.userRepository.findOneBy({ id: userId });

// // 2. Передаем объект целиком
// const note = this.noteRepository.create({
//   ...dto,
//   author: user // TypeORM сам вытащит ID из объекта user и положит в базу
// });