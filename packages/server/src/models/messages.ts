import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import type { Optional } from 'sequelize';

import { ThreadModel } from './threads';

export interface IMessage {
  id: number;
  threadId: number;
  nickname: string;
  message: string;
}

export type CreationMessage = Optional<IMessage, 'id'>;

/* eslint indent: "off" */
@Table({
  tableName: 'messages',
})
export class MessageModel extends Model<IMessage, CreationMessage> {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number;

  @ForeignKey(() => ThreadModel)
  @Column
  threadId: number;

  @BelongsTo(() => ThreadModel)
  team: ThreadModel;

  @AllowNull(false)
  @Column(DataType.STRING)
  nickname: string;

  @Column(DataType.STRING)
  message: string;
}
