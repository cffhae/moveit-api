import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  Entity,
  JoinColumn
} from "typeorm";
import { Site } from "./Site";
import { User } from "./User";
import { Resource } from "./Resource";
import { Room } from "./Room";
import { Appointment } from "./Appointment";
import { Override } from "./Override";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity({ name: "Schedules" })
export class Schedule extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "date" })
  date: Date;

  @Field(() => Site)
  @ManyToOne(() => Site)
  @JoinColumn({ name: "siteCode" })
  siteCode: Site;

  @Field(() => [User])
  @ManyToMany(() => User)
  @JoinTable({
    name: "scheduleBackOffice"
  })
  backOffice: User[];

  @Field(() => [User])
  @ManyToMany(() => User)
  @JoinTable({
    name: "scheduleFrontOffice"
  })
  frontOffice: User[];

  @Field(() => [Resource])
  @ManyToMany(() => Resource)
  @JoinTable({
    name: "scheduleResources"
  })
  resources: Resource[];

  @Field(() => [Room])
  @ManyToMany(() => Room)
  @JoinTable({
    name: "scheduleRooms"
  })
  rooms: Room[];

  @Field(() => [Override])
  @ManyToOne(() => Override, override => override.id)
  overrides: Override[];

  @Field(() => User)
  @ManyToOne(() => User, user => user.id)
  createdBy: User;

  @Field(() => User)
  @ManyToOne(() => User, user => user.id)
  lastModifiedBy: User;

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, appointment => appointment.id)
  appointments: Appointment[];
}
