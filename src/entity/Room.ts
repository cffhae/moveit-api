import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  Entity,
  JoinColumn
} from "typeorm";
import { Site } from "./Site";
import { Transaction } from "./Transaction";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity({ name: "Rooms" })
@Index(["roomCode", "siteCode"], { unique: true })
export class Room extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 20 })
  roomCode: string;

  @Field(() => Site)
  @ManyToOne(() => Site)
  @JoinColumn({ name: "siteCode" })
  siteCode: Site;

  @Field(() => [Transaction])
  @ManyToOne(() => Transaction, transaction => transaction.id)
  transactions: Transaction[];

  @Field()
  @Column({ length: 50 })
  description: string;

  @Field()
  @Column({ default: true })
  isExclusive: boolean;

  @Field()
  @Column({ type: "tinyint" })
  sortOrder: number;

  @Field()
  @Column({ default: true })
  isActive: boolean;
}
