import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

interface IThread {
  id: number;
  name: string;
}

@Table({
  tableName: 'Threads',
})
export class ThreadModel extends Model<IThread> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  // @ts-ignore
  // eslint-disable-next-line indent
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  // eslint-disable-next-line indent
  name: string | undefined;
}
