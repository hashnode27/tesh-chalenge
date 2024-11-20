import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'customer',
})
export class Customer extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  first_name!: string;

  @Column({
    type: DataType.STRING(100),
  })
  last_name!: string;

  @Column({
    type: DataType.STRING(100),
  })
  phone!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
  })
  email?: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  address: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
