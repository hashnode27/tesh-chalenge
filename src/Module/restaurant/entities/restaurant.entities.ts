import { Reservation } from '@/Module/reservations/entities/reservations.entities';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'restaurants',
  timestamps: true,
})
export class Restaurant extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column(DataType.STRING)
  phone: string;

  @Column(DataType.STRING)
  cuisineType: string;

  @Column(DataType.INTEGER)
  totalTables: number;

  @Column(DataType.TIME)
  openingTime: string;

  @Column(DataType.TIME)
  closingTime: string;

  @HasMany(() => Reservation)
  reservations: Reservation[];
}
