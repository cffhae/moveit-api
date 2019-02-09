import {
  BaseEntity,
  PrimaryColumn,
  Column,
  ManyToMany,
  OneToMany,
  Entity
} from "typeorm";
import { User } from "./User";
import { Schedule } from "./Schedule";
import { Transaction } from "./Transaction";
import { Resource } from "./Resource";
import { Room } from "./Room";
import { Appointment } from "./Appointment";
import { Override } from "./Override";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity({ name: "Sites" })
export class Site extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ length: 8 })
  siteCode: string;

  @Field()
  @Column({ length: 50 })
  longCode: string;

  @Field()
  @Column({ length: 50 })
  dbName: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => [User])
  @ManyToMany(() => User)
  users: User[];

  @Field(() => [Schedule])
  @OneToMany(() => Schedule, schedule => schedule.id)
  schedules: Schedule[];

  @Field(() => [Transaction])
  @OneToMany(() => Transaction, transaction => transaction.id)
  transactions: Transaction[];

  @Field(() => [Resource])
  @OneToMany(() => Resource, resource => resource.id)
  resources: Resource[];

  @Field(() => [Room])
  @OneToMany(() => Room, room => room.roomCode)
  rooms: Room[];

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, appointment => appointment.id)
  appointments: Appointment[];

  @Field(() => [Override])
  @OneToMany(() => Override, override => override.id)
  overrides: Override[];
}
