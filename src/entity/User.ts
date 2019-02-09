import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  JoinColumn
} from "typeorm";
import { Resource } from "./Resource";
import { Role } from "./Role";
import { Schedule } from "./Schedule";
import { Site } from "./Site";
import { Transaction } from "./Transaction";

@ObjectType()
@Entity({ name: "Users" })
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ length: 50 })
  firstName: string;

  @Field()
  @Column({ length: 50 })
  lastName: string;

  @Field()
  initials: string;

  @Column()
  pinCode: string;

  @Column()
  salt: string;

  @Field()
  @Column({ default: true })
  forceReset: boolean;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => Role)
  @ManyToOne(() => Role, {})
  @JoinColumn({ name: "roleCode" })
  role: Role;

  @Field(() => [Site])
  @ManyToMany(() => Site)
  @JoinTable({
    name: "userSites"
  })
  sites: Site[];

  @Field(() => [Schedule])
  @ManyToMany(() => Schedule)
  scheduledBackOffice: Schedule[];

  @Field(() => [Schedule])
  @ManyToMany(() => Schedule)
  scheduledFrontOffice: Schedule[];

  @Field(() => [Schedule])
  @OneToMany(() => Schedule, schedule => schedule.createdBy)
  schedulesCreated: Schedule[];

  @Field(() => [Schedule])
  @OneToMany(() => Schedule, schedule => schedule.lastModifiedBy)
  schedulesModified: Schedule[];

  @Field(() => [Transaction])
  @OneToMany(() => Transaction, transaction => transaction.id)
  transactions: Transaction[];

  @Field(() => [Resource])
  @OneToMany(() => Resource, resource => resource.id)
  resources: Resource[];
}
