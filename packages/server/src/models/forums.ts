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

import { ThreadModel } from './threads';

export interface IForum {
  id: number;
  title: string;
  description: string;
}

export type CreationForum = Optional<IForum, 'id'>;

/* eslint indent: "off" */
@Table({
  tableName: 'forums',
})
export class ForumModel extends Model<IForum, CreationForum> {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  description: string;

  @HasMany(() => ThreadModel)
  threads: ThreadModel[];
}
