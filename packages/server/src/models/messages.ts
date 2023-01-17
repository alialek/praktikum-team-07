import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ThreadModel } from './threads';

export interface IMessage {
  id: number;
  threadId: number;
  nickname: string;
}

@Table({
  tableName: 'Messages',
})
export class MessageModel extends Model<IMessage> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  // @ts-ignore
  // eslint-disable-next-line indent
  id: number;

  @ForeignKey(() => ThreadModel)
  @Column({
    type: DataType.INTEGER,
    field: 'id',
  })
  // @ts-ignore
  // eslint-disable-next-line indent
  threadId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  // eslint-disable-next-line indent
  nickname!: string;
}
