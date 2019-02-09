import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  ManyToOne,
  OneToMany,
  OneToOne,
  Index,
  Entity,
  JoinColumn
} from "typeorm";
import { Site } from "./Site";
import { Resource } from "./Resource";
import { Override } from "./Override";
import { Transaction } from "./Transaction";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity({ name: "Appointments" })
@Index(["externalId", "siteCode"], { unique: true })
export class Appointment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  externalId: number;

  @Field(() => Site)
  @ManyToOne(() => Site)
  @JoinColumn({ name: "siteCode" })
  siteCode: Site;

  @Field(() => String)
  @Column({ type: "time" })
  time: Timestamp;

  @Field()
  @Column({ length: 50 })
  firstName: string;

  @Field()
  @Column({ length: 50 })
  lastName: string;

  @Field(() => Resource)
  @OneToMany(() => Resource, resource => resource.id)
  resource: Resource;

  @Field(() => [Transaction])
  @OneToMany(() => Transaction, transaction => transaction.id)
  transactions: Transaction[];

  @Field()
  @Column({ default: false })
  isWorkflowComplete: boolean;

  @Field()
  @OneToOne(() => Override)
  override: Override;
}
