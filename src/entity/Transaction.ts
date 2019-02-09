import {
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  Column,
  Timestamp,
  JoinColumn
} from "typeorm";
import { StatusCode } from "./StatusCode";
import { Appointment } from "./Appointment";
import { Room } from "./Room";
import { Site } from "./Site";
import { User } from "./User";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity({ name: "Transactions" })
export class Transaction extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Appointment)
  @ManyToOne(() => Appointment, appointment => appointment.id)
  appointment: Appointment;

  @Field(() => String)
  @Column({ type: "time" })
  timestamp: Timestamp;

  @Field(() => StatusCode)
  @ManyToOne(() => StatusCode, statusCode => statusCode.statusCode)
  @JoinColumn({ name: "statusCode" })
  statusCode: StatusCode;

  @Field(() => Room)
  @ManyToOne(() => Room, room => room.roomCode)
  roomCode: Room;

  @Field(() => Site)
  @ManyToOne(() => Site, site => site.siteCode)
  @JoinColumn({ name: "siteCode" })
  siteCode: Site;

  @Field(() => User)
  @ManyToOne(() => User, user => user.id)
  user: User;

  @Field()
  @Column()
  data: string;
}
