import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
  HasMany,
} from 'sequelize-typescript';

import type { Optional } from 'sequelize';
import { MessageModel } from './messages';

export interface IThread {
  id: number;
  name: string;
  description: string;
}

export type CreationThread = Optional<IThread, 'id'>;

/* eslint indent: "off" */
@Table({
  tableName: 'threads',
})
export class ThreadModel extends Model<IThread, CreationThread> {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  description: string;

  @HasMany(() => MessageModel)
  messages: MessageModel[];
}
