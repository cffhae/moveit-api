import {
  BaseEntity,
  Column,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  Entity
} from "typeorm";
import { Appointment } from "./Appointment";
import { Schedule } from "./Schedule";
import { Site } from "./Site";
import { User } from "./User";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity({ name: "Overrides" })
export class Override extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Appointment)
  @OneToOne(() => Appointment)
  @JoinColumn()
  appointment: Appointment;

  @Field(() => User)
  @ManyToOne(() => User, user => user.id)
  approvedBy: User;

  @Field(() => String)
  @Column({ type: "timestamp" })
  timestamp: Timestamp;

  @Field(() => Site)
  @ManyToOne(() => Site, site => site.siteCode)
  @JoinColumn({ name: "siteCode" })
  siteCode: Site;

  @Field()
  @Column()
  comment: string;

  @Field(() => Schedule)
  @ManyToOne(() => Schedule, schedule => schedule.id)
  schedule: Schedule;
}
