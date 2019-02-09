import { BaseEntity, PrimaryColumn, Column, OneToMany, Entity } from "typeorm";
import { Transaction } from "./Transaction";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity({ name: "StatusCodes" })
export class StatusCode extends BaseEntity {
  @Field()
  @PrimaryColumn({ length: 4 })
  statusCode: string;

  @Field()
  @Column({ length: 50 })
  description: string;

  @Field()
  @Column({ default: true })
  triggersRoomChange: boolean;

  @Field({ nullable: true })
  @Column({ type: "tinyint", nullable: true })
  sortOrder: number;

  @Field({ nullable: true })
  @Column({ default: true })
  isActive: boolean;

  @Field(() => [Transaction])
  @OneToMany(() => Transaction, transaction => transaction.id)
  transactions: Transaction[];
}
